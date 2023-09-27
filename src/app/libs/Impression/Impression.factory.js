const ImpressionService = require('./Impression.service');
const ImpressionMapper = require('./Impression.mapper');
const impressionEventManager = require('./Impression.event-manager');

/**
 * Class representing a ImpressionFactory
 * @class
 * @memberOf Libs.Impression
 */
class ImpressionFactory {
  /**
   * Create Service instance
   * @param {Object} options - The options object.
   * @return {Object} Service instance.
   */
  service(options = {}) {
    return new ImpressionService();
  }

  /**
   * Get publisher instance
   * @param {Object} options - The options object.
   * @return {Object} Service instance.
   */
  publisher(options = {}) {
    return impressionEventManager;
  }

  /**
   * Create Mapper instance
   * @param {Object} options - The options object.
   * @return {Object} Mapper instance.
   */
  mapper(options = {}) {
    return new ImpressionMapper();
  }
}

module.exports = new ImpressionFactory();
