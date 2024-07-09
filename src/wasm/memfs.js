import { Memory } from './memory.js';
import { assert, AbortError } from './errors.js';
import { getImportObject, ESUCCESS } from './utils.js';
import logger from './logger.js';

export class MemFS {
  constructor(options) {
    const {
      compileStreaming,
      hostWrite,
      stdinStr = '',
      memfsFilename,
    } = options;
    this.hostWriteCallback = hostWrite.bind(options);
    this.stdinStr = stdinStr;
    this.stdinStrPos = 0;
    this.memfsFilename = memfsFilename;
    this.hostMem_ = null; // Set later when wired up to application.
    this.last_exit_code = 0;
    this.capture = false; // Set to true to capture stdout/stderr and not write to host.
    this.stdout = [];
    this.stderr = [];
    this.maxOutput = 1000;
    this.outputCount = 0;

    // Imports for memfs module.
    const env = getImportObject(this, [
      'abort',
      'host_write',
      'host_read',
      'memfs_log',
      'copy_in',
      'copy_out',
    ]);

    this.ready = this.initialize(compileStreaming, env);
  }

  async initialize(compileStreaming, env) {
    const module = await compileStreaming(this.memfsFilename);
    const instance = await WebAssembly.instantiate(module, { env });
    this.instance = instance;
    this.exports = instance.exports;
    this.mem = new Memory(this.exports.memory);
    this.exports.init();
  }

  set hostMem(mem) {
    this.hostMem_ = mem;
  }

  clear() {
    this.stdout = [];
    this.stderr = [];
    this.last_exit_code = 0;
    this.outputCount = 0;
  }

  hostWrite(fd, str) {
    if (typeof str === 'string') {
      this.outputCount += str.length;
      if (this.outputCount > this.maxOutput) {
        this.outputCount = 0;
        this.hostWriteCallback(fd, 'Output limit exceeded. Terminating...');
        this.abort();
      }
    }

    if (!this.capture) {
      this.hostWriteCallback(fd, str);
    }
    if (fd === 1) {
      this.stdout.push(str);
    } else if (fd === 2) {
      this.stderr.push(str);
    }
  }

  startCapture() {
    this.capture = true;
    this.stdout = [];
    this.stderr = [];
  }

  stopCapture() {
    this.capture = false;
    return { stdout: this.stdout, stderr: this.stderr };
  }

  setExitCode(code) {
    this.last_exit_code = code;
  }

  setStdinStr(str) {
    this.stdinStr = str;
    this.stdinStrPos = 0;
  }

  addDirectory(path) {
    this.mem.check();
    this.mem.write(this.exports.GetPathBuf(), path);
    this.exports.AddDirectoryNode(path.length);
  }

  addFile(path, contents) {
    const length =
      contents instanceof ArrayBuffer ? contents.byteLength : contents.length;
    this.mem.check();
    this.mem.write(this.exports.GetPathBuf(), path);
    const inode = this.exports.AddFileNode(path.length, length);
    const addr = this.exports.GetFileNodeAddress(inode);
    this.mem.check();
    this.mem.write(addr, contents);
  }

  getFileContents(path) {
    this.mem.check();
    this.mem.write(this.exports.GetPathBuf(), path);
    const inode = this.exports.FindNode(path.length);
    const addr = this.exports.GetFileNodeAddress(inode);
    const size = this.exports.GetFileNodeSize(inode);
    return new Uint8Array(this.mem.buffer, addr, size);
  }

  abort() {
    throw new AbortError();
  }

  host_write(fd, iovs, iovs_len, nwritten_out) {
    this.hostMem_.check();
    assert(fd <= 2);
    let size = 0;
    let str = '';
    for (let i = 0; i < iovs_len; ++i) {
      const buf = this.hostMem_.read32(iovs);
      iovs += 4;
      const len = this.hostMem_.read32(iovs);
      iovs += 4;
      str += this.hostMem_.readStr(buf, len);
      size += len;
    }
    this.hostMem_.write32(nwritten_out, size);
    this.hostWrite(fd, str);
    return ESUCCESS;
  }

  host_read(fd, iovs, iovs_len, nread) {
    this.hostMem_.check();
    assert(fd === 0);
    let size = 0;
    for (let i = 0; i < iovs_len; ++i) {
      const buf = this.hostMem_.read32(iovs);
      iovs += 4;
      const len = this.hostMem_.read32(iovs);
      iovs += 4;
      const lenToWrite = Math.min(len, this.stdinStr.length - this.stdinStrPos);
      if (lenToWrite === 0) {
        break;
      }
      this.hostMem_.write(
        buf,
        this.stdinStr.substr(this.stdinStrPos, lenToWrite)
      );
      size += lenToWrite;
      this.stdinStrPos += lenToWrite;
      if (lenToWrite !== len) {
        break;
      }
    }
    this.hostMem_.write32(nread, size);
    return ESUCCESS;
  }

  memfs_log(buf, len) {
    this.mem.check();
    logger.info(this.mem.readStr(buf, len));
  }

  copy_out(clang_dst, memfs_src, size) {
    this.hostMem_.check();
    const dst = new Uint8Array(this.hostMem_.buffer, clang_dst, size);
    this.mem.check();
    const src = new Uint8Array(this.mem.buffer, memfs_src, size);
    dst.set(src);
  }

  copy_in(memfs_dst, clang_src, size) {
    this.mem.check();
    const dst = new Uint8Array(this.mem.buffer, memfs_dst, size);
    this.hostMem_.check();
    const src = new Uint8Array(this.hostMem_.buffer, clang_src, size);
    dst.set(src);
  }
}
