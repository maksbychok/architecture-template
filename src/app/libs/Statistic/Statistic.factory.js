const StatisticService = require('./Statistic.service');
const StatisticRepo = require('./Statistic.repo');
const StatisticMapper = require('./Statistic.mapper');
const statisticExportStateFactory = require('@libs/StatisticExportState/StatisticExportState.factory');

/**
 * Class representing a StatisticFactory
 * @class
 * @memberOf Libs.Statistic
 */
class StatisticFactory {
  /**
   * Create Service instance
   * @param {Object} options - The options object.
   * @return {Object} Service instance.
   */
  service(options = {}) {
    return new StatisticService(this.repo(), statisticExportStateFactory.service());
  }

  /**
   * Create Repo instance
   * @param {Object} options - The options object.
   * @return {Object} Repo instance.
   */
  repo(options = {}) {
    return new StatisticRepo();
  }

  /**
   * Create Mapper instance
   * @param {Object} options - The options object.
   * @return {Object} Mapper instance.
   */
  mapper(options = {}) {
    return new StatisticMapper();
  }
}

module.exports = new StatisticFactory();
