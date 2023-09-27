const {
  manager: impressionPublisher,
  events: { impressionAdded },
} = require('./Impression.event-manager');

/**
 * Class representing a StripeService
 * @class
 * @memberOf Libs.Impression
 */
class ImpressionService {
  /**
   * @constructs ImpressionService
   */
  constructor() {
    this._publisher = impressionPublisher;
  }

  /**
   * Add impression.
   * @param {Object} consumer - The consumer object.
   * @param {Object} dto - The impression object value.
   * @return {Promise} Promise object represents the response.
   */
  async add(consumer, dto) {
    this._publisher.emit(impressionAdded, { consumer, dto });
  }
}

module.exports = ImpressionService;
