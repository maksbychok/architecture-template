const CreateExportFilesCommand = require('@libs/Statistic/DataPumpFormat/csv/CreateExportFiles.command');
const StrategyInterface = require('../Strategy.interface');

/**
 * Class representing a CsvStrategy
 */
class CsvStrategy extends StrategyInterface {

  async processExport() {
    const createExportFile = new CreateExportFilesCommand(this.data, this.format, this.extra);
    return createExportFile.execute();
  }

  processImport() { }

}

module.exports = CsvStrategy;