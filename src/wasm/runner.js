/**
 * CodeRunner for interacting building and running C/C++ code in
 * a WebAssembly environment.
 */
import { MemFS } from './memfs.js';
import { Memory } from './memory.js';
import { Tar } from './tar.js';
import { ProcExit, NotImplemented } from './errors.js';
import { getImportObject, ESUCCESS } from './utils.js';
import logger from './logger.js';

/**
 * Built programs run in a sandbox with a WASI-like interface.
 * A built program is an instance of this class.
 *
 * This class is used to run a WebAssembly module in a sandbox.
 *
 * An app should be executed from a WebWorker, this would allow
 * to run the WebAssembly module in a separate thread and stop
 * it if it takes too long to execute (e.g. infinite loop).
 *
 * @param {WebAssembly.Module} exec - The WebAssembly module to run.
 * @param {MemFS} memfs - The MemFS instance to use.
 * @param {string} name - The name of the program used for argv[0].
 * @param {string[]} args - The arguments to pass to the program.
 */
export class App {
  constructor(exec, memfs, name, ...args) {
    this.argv = [name, ...args];
    this.environ = { USER: 'alice' };
    this.memfs = memfs;
    this.handles = new Map();
    this.nextHandle = 0;

    //const env = getImportObject(this, []);

    const wasi_unstable = getImportObject(this, [
      'proc_exit', 'environ_sizes_get', 'environ_get', 'args_sizes_get',
      'args_get', 'random_get', 'clock_time_get', 'poll_oneoff'
    ]);

    // Fill in some WASI implementations from memfs.
    Object.assign(wasi_unstable, this.memfs.exports);

    this.ready = WebAssembly.instantiate(exec, { wasi_unstable }).then(instance => {
      this.instance = instance;
      this.exports = this.instance.exports;
      this.mem = new Memory(this.exports.memory);
      this.memfs.hostMem = this.mem;
    });
  }

  async run() {
    await this.ready;
    return new Promise((resolve, reject) => {
      try {
        this.exports._start();
        this.memfs.setExitCode(0);
      } catch (exn) {
        if (exn instanceof ProcExit) {
          this.memfs.setExitCode(exn.code);
        } else {
          reject(exn);
        }
      } finally {
        this.memfs.hostWrite('exit', this.memfs.last_exit_code);
        resolve({
          exitCode: this.memfs.last_exit_code,
          stdout: this.memfs.stdout,
          stderr: this.memfs.stderr,
        });
      }
    });
  }

  /**
   * System call to exit the program.
   */
  proc_exit(code) {
    throw new ProcExit(code);
  }

  /**
   * System call to get the sizes of the environment variables.
   */
  environ_sizes_get(environ_count_out, environ_buf_size_out) {
    this.mem.check();
    let size = 0;
    const names = Object.getOwnPropertyNames(this.environ);
    for (const name of names) {
      const value = this.environ[name];
      size += name.length + value.length + 2;
    }
    this.mem.write64(environ_count_out, names.length);
    this.mem.write64(environ_buf_size_out, size);
    return ESUCCESS;
  }

  /**
   * System call to get the environment variables.
   */
  environ_get(environ_ptrs, environ_buf) {
    this.mem.check();
    const names = Object.getOwnPropertyNames(this.environ);
    for (const name of names) {
      this.mem.write32(environ_ptrs, environ_buf);
      environ_ptrs += 4;
      environ_buf += this.mem.writeStr(environ_buf, `${name}=${this.environ[name]}`);
    }
    this.mem.write32(environ_ptrs, 0);
    return ESUCCESS;
  }

  /**
   * System call to get the sizes of the arguments.
   */
  args_sizes_get(argc_out, argv_buf_size_out) {
    this.mem.check();
    let size = 0;
    for (let arg of this.argv) {
      size += arg.length + 1;
    }
    this.mem.write64(argc_out, this.argv.length);
    this.mem.write64(argv_buf_size_out, size);
    return ESUCCESS;
  }

  /**
   * System call to get the arguments.
   */
  args_get(argv_ptrs, argv_buf) {
    this.mem.check();
    for (let arg of this.argv) {
      this.mem.write32(argv_ptrs, argv_buf);
      argv_ptrs += 4;
      argv_buf += this.mem.writeStr(argv_buf, arg);
    }
    this.mem.write32(argv_ptrs, 0);
    return ESUCCESS;
  }

  /**
   * System call to get random data.
   */
  random_get(buf, buf_len) {
    const data = new Uint8Array(this.mem.buffer, buf, buf_len);
    for (let i = 0; i < buf_len; ++i) {
      data[i] = (Math.random() * 256) | 0;
    }
  }

  /**
   * System call to get the current time.
   */
  clock_time_get(clock_id, precision, time_out) {
    throw new NotImplemented('wasi_unstable', 'clock_time_get');
  }

  /**
   * System call to poll for events.
   */
  poll_oneoff(in_ptr, out_ptr, nsubscriptions, nevents_out) {
    throw new NotImplemented('wasi_unstable', 'poll_oneoff');
  }
}

export default class CodeRunnerWorker {
  constructor(options) {
    options = {
      cargs: ['-std=c++17', '-O2', '-ferror-limit', '1', '-fmessage-length', '80', '-x', 'c++'],
      clargs: [`stack-size=${1024 * 1024}`],
      ...options
    }
    this.moduleCache = {};
    this.readBuffer = options.readBuffer;
    this.compileStreaming = options.compileStreaming;
    this.clangFilename = new URL('wasm/clang.wasm', import.meta.url).href;
    this.lldFilename = new URL('wasm/lld.wasm', import.meta.url).href;
    this.sysrootFilename = new URL('wasm/sysroot.tar', import.meta.url).href;
    this.memfsFilename = new URL('wasm/memfs.wasm', import.meta.url).href;
    this.eventListener = null;
    this.onNewCache = null;
    this.clargs = options.clargs;
    this.cargs = [
      '-disable-free',
      '-isysroot',
      '/',
      '-internal-isystem',
      '/include/c++/v1',
      '-internal-isystem',
      '/include',
      '-internal-isystem',
      '/lib/clang/8.0.1/include',
      ...options.cargs,
    ];
  }

  init() {
    logger.info('Initializing MemFS...');
    this.memfs = new MemFS({
      compileStreaming: this.compileStreaming,
      hostWrite: this.emit.bind(this),
      memfsFilename: this.memfsFilename,
    });

    (async () => {
      await this.untar(this.memfs, this.sysrootFilename);
    })();
  }

  setOnNewCache(listener) {
    this.onNewCache = listener;
  }

  linkCachedModules(cache) {
    this.moduleCache = cache;
  }

  setListener(listener) {
    this.eventListener = listener;
  }

  emit(event, message) {
    if (typeof this.eventListener === 'function') {
      this.eventListener(event, message);
    }
  }

  async getModule(name) {
    if (this.moduleCache[name]) {
      logger.debug(`Using cached module: ${name}, ${typeof this.moduleCache[name]}`);
      return this.moduleCache[name];
    }
    logger.info(`Fetching and compiling ${name}...`);
    const module = await this.compileStreaming(name);
    this.moduleCache[name] = module;
    this.onNewCache(name, module);
    return module;
  }

  /**
   * Populate the MemFS with the contents of a tarball.
   * It sets up the sysroot.
   */
  async untar(memfs, filename) {
    await this.memfs.ready;
    logger.info('Untarring sysroot...');
    const tar = new Tar(await this.readBuffer(filename));
    tar.untar(memfs);
  }

  /**
   * Run a command in a module.
   */
  async run(module, command, ...args) {
    logger.info(`Executing ${command} ${args.join(' ')}...`);
    this.emit('echo', `${command} ${args.join(' ')}`);
    this.memfs.clear();
    const app = new App(module, this.memfs, command, ...args);
    return app.run();
  }

  async compile(input, contents, obj) {
    await this.ready;
    this.memfs.addFile(input, contents);
    const clang = await this.getModule(this.clangFilename);
    return await this.run(
      clang,
      'clang',
      '-cc1',
      '-emit-obj',
      ...this.cargs,
      '-o',
      obj,
      input
    );
  }

  async link(obj, wasm) {
    const libdir = 'lib/wasm32-wasi';
    const crt1 = `${libdir}/crt1.o`;

    await this.ready;
    return await this.run(
      await this.getModule(this.lldFilename),
      'wasm-ld',
      '--no-threads',
      '--export-dynamic',
      '-z',
      ...this.clargs,
      `-L${libdir}`,
      crt1,
      obj,
      '-lc',
      '-lc++',
      '-lc++abi',
      '-o',
      wasm
    );
  }

  async build(options = {}) {
    const filename = options.filename;
    const objname = filename.replace(/\.[^.]*$/, '.o');
    const wasmname = filename.replace(/\.[^.]*$/, '.wasm');

    //this.memfs.startCapture();
    var outputs = await this.compile(filename, options.source, objname);
    if (outputs['exitCode'] !== 0) {
      return outputs;
    }
    //this.memfs.startCapture();
    outputs = await this.link(objname, wasmname);
    if (outputs['exitCode'] !== 0) {
      return outputs;
    }
    return outputs;
  }

  async exec(options = {}) {
    options = {
      filename: 'main.wasm',
      args: [],
      ...options
    };
    const exec = await WebAssembly.compile(this.memfs.getFileContents(options.filename));
    return await this.run(exec, options.filename, ...options.args);
  }


  async compileLinkRun(source, ...args) {
    const basename = 'main';
    const wasm = await this.build(source, basename);
    const exec = await WebAssembly.compile(this.memfs.getFileContents(wasm));
    return this.run(exec, wasm, ...args);
  }
}
