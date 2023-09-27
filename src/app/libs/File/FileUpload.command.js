const fs = require('fs');
const { promisify } = require('util');
const mv = require('mv');

/**
 * Class representing a FileUploadCommand
 * @class
 *
 * @memberOf Lib.File
 */
class FileUploadCommand {
  /**
   * @constructs FileUploadCommand
   * @param {Object} file - The file object.
   * @param {String} path - The path string.
   */
  constructor(files = [], path) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    this._context = files.map(({ path: tmpPath, filename, ...optional }) => ({
      from: tmpPath,
      to: `${path}${filename}`,
      filename,
      ...optional,
    }));
  }

  /**
   * Upload file to DB.
   */
  async execute() {
    const fsRenameAsync = promisify(mv);
    await Promise.all(
      this._context.map(({ from, to }) =>
        fsRenameAsync(from, to, { mkdirp: true })
      )
    );
    return this._context;
  }
}

module.exports = FileUploadCommand;
