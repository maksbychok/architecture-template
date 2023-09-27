const { ConsumerModel } = require('@models');
const statisticFilter = require('@app/search/merchant/statistic');
const moment = require('moment');
const DataPump = require('./DataPumpFormat/DataPump');
const CsvStrategy = require('./DataPumpFormat/csv/Csv.strategy');
const statisticalMapperDataPump = require('./DataPumpFormat/Statistic.mapper');
const FolderToZipCommand = require('@libs/File/FolderToZip.command');
const FolderRemoveCommand = require('@libs/File/FolderRemove.command');
const { UPLOADS_FOLDER_PATH } = process.env;

/**
 * Class representing a StatisticService
 * @class
 * @memberOf Libs.Statistic
 */
class StatisticService {
  /**
   * @constructs StatisticService
  */
  constructor(statisticRepo, statisticExportStateService) {
    this._statisticRepo = statisticRepo;
    this._statisticExportStateService = statisticExportStateService;
  }

  /**
   * Createobject. Store to DB.
   * @param {Object} dto - The statistic object value.
   * @return {Promise} Promise object represents the response.
  */
  create(dto) {
    return this._statisticRepo.create(dto);
  }

  /**
   * Get all Statistics.
   * @return {Promise} Promise object represents the response.
  */
  all(query = {}) {
    return this._statisticRepo.find(query, null, {
      include: [
        { model: ConsumerModel },
      ],
    });
  }

  paginate(query) {
    const where = {};
    return this._statisticRepo.findAndCountAll({ where }, {
      include: [
        {
          model: ConsumerModel,
        },
      ],
      ...query
    });
  }

  /**
   * Get an overview of the 
   * @param query
   * @returns {Stream}
   */
  getOverviewData(query) {
    return this._statisticRepo
      .findStream(null, query, {
        mapper: statisticalMapperDataPump.prepareData.bind(statisticalMapperDataPump)
      });
  }

  /**
   * Get an overview report
   * @param setup
   * @returns {Promise<string>}
   */
  async getOverviewReport(setup) {
    const { body, format } = setup;
    const preparedQuery = statisticFilter(body, false);
    const results = this.getOverviewData(preparedQuery);
    const hasFilter = this.hasFilter(body);
    const zipPath = this.getUploadPath(setup);
    const zipName = this.getFileName(hasFilter);
    const exportState = await this._statisticExportStateService.create({
      format,
      path: zipPath,
      fileName: zipName
    });
    try {
      const dataPump = new DataPump();
      const pathToExportTemp = await dataPump.export(new CsvStrategy(format, results, body));
      const zipFile = `${zipPath}/${zipName}`;
      await new FolderToZipCommand(pathToExportTemp, zipFile).execute();
      await new FolderRemoveCommand(pathToExportTemp).execute();
      await this._statisticExportStateService.setStatus(exportState, 'done');
    } catch (error) {
      console.log(error)
      await this._statisticExportStateService.setStatus(exportState, 'error');
    }
  }

  hasFilter(body) {
    const { order, orderBy, format, ...filter } = body;
    const { length = 0 } = Object.values(filter);
    return length > 0
  }

  getFileName(hasFilter) {
    const prefix = hasFilter ? 'Filtered' : 'Full';
    const m = moment();
    const mf = m.format.bind(m);
    return `${prefix}_${mf('YYYYMMDD')}_${mf('HHmmss')}_${mf('SSS')}.zip`;
  }

  getUploadPath(setup) {
    const { body: { fn = '' }, format } = setup;
    return `${UPLOADS_FOLDER_PATH}/statistics/${fn}/${format}`;
  }

  /**
   * Get Statistic by id.
   * @param {Object} id - The objectID item.
   * @param {Object} options - The options item.
   * @return {Promise} Promise object represents the response.
  */
  getById(id, options = {}) {
    return this._statisticRepo.findById(id, options);
  }

  /**
   * Update Statistic by id.
   * @param {Object|Number} instance - The Statistic instance.
   * @param {Object} fields - The update fields.
   * @param {Object} options - The sequelize options fields.
   * @return {Promise} Promise object represents the response.
  */
  async update(instance, fields, options = {}) {
    const id = instance.id || instance;
    const updateInstance = await this.getById(id);
    return this._statisticRepo.update(
      updateInstance,
      fields,
      options
    )
      .then(
        ([_, updated]) => updated
      );
  }
}

module.exports = StatisticService;
