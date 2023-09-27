const StatisticExportStateService = require('./StatisticExportState.service');
const StatisticExportStateRepo = require('./StatisticExportState.repo');
const StatisticExportStateMapper = require('./StatisticExportState.mapper');

/**
 * Class representing a StatisticExportStateFactory
 * @class
 * @memberOf Libs.StatisticExportState
 */
class StatisticExportStateFactory {
  /**
   * Create Service instance
   * @param {Object} options - The options object.
   * @return {Object} Service instance.
   */
  service(options = {}) {
    return new StatisticExportStateService(this.repo());
  }

  /**
   * Create Repo instance
   * @param {Object} options - The options object.
   * @return {Object} Repo instance.
   */
  repo(options = {}) {
    return new StatisticExportStateRepo();
  }

  /**
   * Create Mapper instance
   * @param {Object} options - The options object.
   * @return {Object} Mapper instance.
   */
  mapper(options = {}) {
    return new StatisticExportStateMapper();
  }

}

module.exports = new StatisticExportStateFactory();
