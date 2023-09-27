const { UPLOADS_FOLDER_PATH } = process.env;
const XLSX = require('xlsx');
const moment = require('moment');
const fs = require('fs');

/**
 * Class representing a CreateExportFilesCommand
 * @class
 *
 * @memberOf Lib.Statistic.DataPumpFormat.csv
 */
class CreateExportFilesCommand {

    /**
     * @constructs CreateExportFilesCommand
     * @param stream
     * @param format
     * @param extra 
     */
    constructor(data, format = '', extra) {
        this.data = data;
        this.format = format;
        this.extra = extra;
    }

    async writeToFile(data, path) {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'PROJECT');
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }
        const newFile = `${path}/${this.getFileName()}`;
        await XLSX.writeFile(wb, newFile);
        return newFile;
    }

    getFileName() {
        return `${moment().format('YYYYMMDD')}`
            + `_${moment().format('HHmmss')}`
            + `_${moment().format('SSS')}.${this.getFormat()}`;
    }

    getUploadPath() {
        const { fn } = this.extra;
        return `${UPLOADS_FOLDER_PATH}/statistics/${fn}/${this.getFormat()}/temp`;
    }

    getFormat() {
        return this.format;
    }

    execute() {
        return new Promise((resolve, reject) => {
            const path = this.getUploadPath();
            this.data.on('data', rowData => {
                const data = JSON.parse(rowData.toString());
                return this.writeToFile(data, path);
            });
            this.data.on('end', () => resolve(path));
            this.data.on('error', reject);
        });
    }

}

module.exports = CreateExportFilesCommand;