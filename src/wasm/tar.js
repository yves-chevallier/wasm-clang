/**
 * Untar a tar file into a MemFS instance.
 *
 * Typical usage is to load sysroot.tar.
 *
 * Author: Ben Smith (binji)
 */
import { readStr } from './utils.js';
import { assert } from './errors.js';
import logger from './logger.js';

const FILE_TYPE_REGULAR = '0';
const FILE_TYPE_DIRECTORY = '5';

export class Tar {
  constructor(buffer) {
    this.u8 = new Uint8Array(buffer);
    this.offset = 0;
  }

  readStr(len) {
    const result = readStr(this.u8, this.offset, len);
    this.offset += len;
    return result;
  }

  readOctal(len) {
    return parseInt(this.readStr(len), 8);
  }

  alignUp() {
    this.offset = (this.offset + 511) & ~511;
  }

  readEntry() {
    if (this.offset + 512 > this.u8.length) {
      return null;
    }

    const entry = {
      filename: this.readStr(100),
      mode: this.readOctal(8),
      owner: this.readOctal(8),
      group: this.readOctal(8),
      size: this.readOctal(12),
      mtim: this.readOctal(12),
      checksum: this.readOctal(8),
      type: this.readStr(1),
      linkname: this.readStr(100),
    };

    if (this.readStr(8) !== 'ustar  ') {
      return null;
    }

    entry.ownerName = this.readStr(32);
    entry.groupName = this.readStr(32);
    entry.devMajor = this.readStr(8);
    entry.devMinor = this.readStr(8);
    entry.filenamePrefix = this.readStr(155);
    this.alignUp();

    if (entry.type === FILE_TYPE_REGULAR) {
      entry.contents = this.u8.subarray(this.offset, this.offset + entry.size);
      this.offset += entry.size;
      this.alignUp();
    } else if (entry.type !== FILE_TYPE_DIRECTORY) {
      logger.error(`Unknown entry type: ${entry.type}`);
      assert(false);
    }
    return entry;
  }

  untar(memfs) {
    let entry;
    while ((entry = this.readEntry()) !== null) {
      switch (entry.type) {
        case FILE_TYPE_REGULAR:
          memfs.addFile(entry.filename, entry.contents);
          break;
        case FILE_TYPE_DIRECTORY:
          memfs.addDirectory(entry.filename);
          break;
      }
    }
  }
}
