const impressionFactory = require('@libs/Impression/Impression.factory');
const { sequelize } = require('@models');

/**
 * Class representing a ImpressionListener
 * @class
 * @memberOf API.Consumers.Impression
 * @augments Listener
 */
class ImpressionListener {
  /**
   * @constructs ImpressionListener
   */
  constructor(statisticService) {
    this._statisticService = statisticService;
    this.init(impressionFactory.publisher());
  }

  /**
   * Start listining.
   * @method
   * @param {Object} - Event publisher object
   */
  init({ manager, events }) {
    this.manager = manager;
    const { impressionAdded } = events;
    manager.on(impressionAdded, this.storeStatistic.bind(this));
  }

  /**
   * Store statistic model.
   * @method
   * @param {Object} - Event object
   */
  storeStatistic({ consumer, dto }) {
    try {
      const { id: consumerId } = consumer;
      const { latitude, longitude, deviceId } = dto;
      this._statisticService.create({
        consumerId,
        latitude,
        longitude,
        deviceId,
        impressionFee: 10,
        consumer
      });
    } catch (err) {
      this.manager.emit('error', err);
    }
  }

}
module.exports = ImpressionListener;
