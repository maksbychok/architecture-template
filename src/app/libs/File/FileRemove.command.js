const fs = require('fs');

/**
 * Class representing a FileRemoveCommand
 * @class
 *
 * @memberOf Lib.File
 */
class FileRemoveCommand {
  /**
   * @constructs FileRemoveCommand
   * @param {Array} files - The files array.
   * @param {Object} options - The save array.
   */
  constructor(files = [], options = {}) {
    this._files = files;
  }

  /**
   * Remove file to DB.
   */
  execute() {
    this._files
      .filter(path => fs.existsSync(path))
      .forEach(path => fs.unlinkSync(path));
  }
}

module.exports = FileRemoveCommand;
