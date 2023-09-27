const MapperInterface = require('@interfaces/Mapper.interface');
const StatisticConsumerMapper = require('./StatisticConsumer.mapper');

/**
 * Class representing a StatisticMapper
 * @class
 * @memberOf Libs.Statistic
 */
class StatisticMapper extends MapperInterface {
  /* Map data to app layer.
   * @method
   */
  toEntity(values) {
    if (!values) return values;

    const {
      id,
      latitude,
      longitude,
      deviceId,
      impressionFee,
      createdAt,
    } = values;
    const consumerMapper = new StatisticConsumerMapper();
    return {
      id,
      latitude,
      longitude,
      deviceId,
      impressionFee,
      createdAt,
      consumer: consumerMapper.toEntity(values),
    };
  }

  /* Map data to db layer.
   * @method
   */
  toDatabase(values) {
    const {
      latitude,
      longitude,
      deviceId,
      impressionFee,
      consumer
    } = values;
    const consumerMapper = new StatisticConsumerMapper();
    return {
      ...(latitude && { latitude }),
      ...(longitude && { longitude }),
      ...(deviceId && { deviceId }),
      ...(impressionFee && { impressionFee }),
      ...consumerMapper.toDatabase(consumer)
    };
  }
}

module.exports = StatisticMapper;
