const { UPLOADS_FOLDER_PATH } = process.env;
const XLSX = require('xlsx');
const moment = require('moment');
const fs = require('fs');

/**
 * Class representing a CreateExportFileCommand
 * @class
 *
 * @memberOf Lib.Statistic.DataPumpFormat.csv
 */
class CreateExportFileCommand {
  
  /**
   * @constructs CreateExportFileCommand
   * @param data
   * @param format
   */
   constructor(data = [], format = '') {
     this.data = data;
     this.format = format;
   }
  
   async writeToFile() {
     const ws = XLSX.utils.json_to_sheet(this.data);
     const wb = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'PROJECT');
  
     const statisticsUploadPath = this.getUploadPath();
     if (!fs.existsSync(statisticsUploadPath)) {
       fs.mkdirSync(statisticsUploadPath, { recursive: true });
     }
  
     const newFile = `${statisticsUploadPath}${this.getFileName()}`;
     await XLSX.writeFile(wb, newFile);
     return newFile;
   }
   
   getFileName() {
     return `${moment().format('YYYYMMDD')}`
       +`_${moment().format('HHmmss')}`
       +`_${moment().format('SSS')}.${this.getFormat()}`;
   }
  
   getUploadPath() {
     return `${UPLOADS_FOLDER_PATH}/statistics/${this.getFormat()}/`;
   }
   
   getFormat() {
     return this.format;
   }
   
   async execute() {
     return this.writeToFile();
   }
  
}

module.exports = CreateExportFileCommand;