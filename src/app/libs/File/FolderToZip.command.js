const fs = require('fs');
const archiver = require('archiver');

/**
 * Class representing a FolderToZipCommand
 * @class
 * 
 * @memberOf Lib.File
 */
class FolderToZipCommand {
    /**
     * @constructs FolderToZipCommand
     * @param {String} source
     * @param {String} out
    */
    constructor(source, out) {
        this._source = source;
        this._out = out;
    }

    /**
     * Create zip file.
     * @returns {Promise} 
    */
    execute() {
        return this.zipDirectory(this._source, this._out);
    }

    /**
     * @param {String} source
     * @param {String} out
     * @returns {Promise}
    */
    zipDirectory(source, out) {
        const archive = archiver('zip', { zlib: { level: 9 } });
        const stream = fs.createWriteStream(out);

        return new Promise((resolve, reject) => {
            archive
                .directory(source, false)
                .on('error', err => reject(err))
                .pipe(stream);

            stream.on('close', () => resolve());
            archive.finalize();
        });
    }
}

module.exports = FolderToZipCommand;
