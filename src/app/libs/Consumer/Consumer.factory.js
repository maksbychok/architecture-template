const ConsumerService = require('./Consumer.service');
const ConsumerMapper = require('./Consumer.mapper');
const ConsumerRepo = require('./Consumer.repo');

/**
 * Class representing a ConsumerFactory
 * @class
 * @memberOf Libs.Consumer
 */
class ConsumerFactory {
  /**
   * Create Service instance
   * @param {Object} options - The options object.
   * @return {Object} Service instance.
  */
  service(options = {}) {
    return new ConsumerService(
      this.repo(),
    );
  }

  /**
   * Create Repo instance
   * @param {Object} options - The options object.
   * @return {Object} Repo instance.
  */
  repo(options = {}) {
    return new ConsumerRepo();
  }

  /**
   * Create Mapper instance
   * @param {Object} options - The options object.
   * @return {Object} Payment Mapper instance.
  */
  mapper(options = {}) {
    return new ConsumerMapper();
  }
}

module.exports = new ConsumerFactory();