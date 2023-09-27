const fs = require('fs');
const { promisify } = require('util');
const rimraf = require('rimraf');


/**
 * Class representing a FolderRemoveCommand
 * @class
 * 
 * @memberOf Lib.File
 */
class FolderRemoveCommand {
  /**
   * @constructs FolderRemoveCommand
   * @param {Array} files - The files array.
   * @param {Object} options - The save array.
  */
  constructor(folder = '') {
    this._folder = folder;
  }

  /**
   * Remove file to DB.
  */
  execute() {
    const rimrafAsync = promisify(rimraf);
    return rimrafAsync(this._folder);
  }
}

module.exports = FolderRemoveCommand;
