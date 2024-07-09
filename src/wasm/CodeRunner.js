import { wrap, proxy } from 'comlink';
import EventEmitter from 'events';
import { TimeoutError, AbortError } from './errors.js';


class CodeRunner extends EventEmitter {
  constructor(options = {}) {
    super();
    Object.assign(this, {
      timeout: 1000,
      maxOutput: 1000,
      args: [],
      env: { USER: 'alice' },
      files: {},
      cargs: [
        '-std=c++17',
        '-O2',
        '-ferror-limit 3',
        '-fmessage-length 80',
        '-fcolor-diagnostics',
        '-x c++',
      ],
      clargs: [
        `stack-size=${1024 * 1024}`,
      ],
      args: [],
      ...options
    });

    this.outputedChars = 0;

    if (options.stdout && typeof options.stdout === 'function') {
      this.on('stdout', options.stdout);
    }

    if (options.stderr && typeof options.stderr === 'function') {
      this.on('stderr', options.stderr);
    }
    this._cache = {};
    this._initializeWorker();
  }

  async _initializeWorker() {
    console.log("Initializing worker...");
    this.outputedChars = 0;
    this.worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
    this.api = wrap(this.worker);
    this.api.setOnNewCache(proxy((key, value) => {
      this._cache[key] = value;
    }));
    this.api.linkCachedModules(this._cache);
    this.api.init();

    this.api.setListener(proxy((fd, data) => {
      if (fd === 1) {
        this.outputedChars += data.length;
        this.emit('stdout', data);
      }
      else if (fd === 2) {
        this.outputedChars += data.length;
        this.emit('stderr', data);
      }
      else if (fd === 'echo') {
        this.emit('echo', data);
      }
    }));
  }

  async _callWithTimeout(method, options) {
    let timeoutId;
    try {
      const resultPromise = this.api[method]([options]);
      const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => { reject(new TimeoutError()) }, options.timeout);
      });

      const result = await Promise.race([resultPromise, timeoutPromise]);
      clearTimeout(timeoutId);
      return { exitCode: result.exitCode, stdout: result.stdout.join(''), stderr: result.stderr.join('') };
    } catch (error) {
      if (error instanceof TimeoutError) {
        console.log("Timeout Occured, will restart worker...");
        this.emit('stderr', "Error: Timeout!\n");
        this.restart();
      } else if (error instanceof AbortError) {
        console.error("Abort Execution", error);
        this.emit('stderr', error);
      }
      clearTimeout(timeoutId);
      return { exitCode: 124, stdout: '', stderr: "Error: Timeout!\n" };
    }
  }

  /**
   * Restart the worker.
   */
  restart() {
    console.log("Restarting worker...");
    this.worker.terminate();
    // sleep 2 secondes (blocking)
    const start = Date.now();
    while (Date.now() - start < 2000) { }

    this._initializeWorker();
  }

  async build(options = {}) {
    if (typeof options === 'string') {
      options = { source: options };
    }
    return this._callWithTimeout('build', {
      source: '',
      filename: 'main.cpp',
      cargs: this.cargs,
      clargs: this.clargs,
      timeout: 10000,
      ...options
    });
  }

  async run(options = {}) {
    return this._callWithTimeout('exec', {
      args: this.args,
      env: this.env,
      files: this.files,
      filename: 'main.wasm',
      timeout: this.timeout,
      ...options
    });
  }
}

export default CodeRunner;
