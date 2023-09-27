const consumerMapper = require('@libs/Statistic/DataPumpFormat/Consumer.mapper');
const moment = require('moment');
const currency = require('currency.js');

class StatisticMapper {

  /**
   * Prepare data for writing to file
   * @param values
   * @returns {{}|*}
   */
  prepareData(values) {
    if (!values) return values;

    const {
      consumerId,
      latitude,
      longitude,
      impressionFee,
      createdAt,
    } = values;
    const consumer = consumerMapper.prepareData(values);
    return {
      ...(createdAt !== undefined && { 'Timestamp': this.timestamp(createdAt, 'YYYY/MM/DD HH:mm:ss') }),
      ...(longitude !== undefined && { 'GPS Longitude': longitude }),
      ...(latitude !== undefined && { 'GPS Latitude': latitude }),
      ...(consumerId !== undefined && { 'Consumer ID': consumerId }),
      ...(impressionFee !== undefined && { 'Impression Cost': this.currencyUSD(impressionFee).format() }),
      ...consumer
    };
  }

  timestamp(date, format = 'YYYY/MM/DD HH:mm:ss') {
    if (moment(date).isValid()) {
      return moment(date).utc().format(format);
    }
    return '';
  }

  currencyUSD(value = 0) {
    return currency(value, { symbol: '$', precision: 2 });
  }

}

module.exports = new StatisticMapper();