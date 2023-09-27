const address = require('@app/search/merchant/statistic/filters/address.js');
const addressSecondLine = require('@app/search/merchant/statistic/filters/addressSecondLine.js');
const birthdayFrom = require('@app/search/merchant/statistic/filters/birthdayFrom.js');
const city = require('@app/search/merchant/statistic/filters/city.js');
const consumerId = require('@app/search/merchant/statistic/filters/consumerId.js');
const createdAtFrom = require('@app/search/merchant/statistic/filters/createdAtFrom.js');
const deviceId = require('@app/search/merchant/statistic/filters/deviceId.js');
const email = require('@app/search/merchant/statistic/filters/email.js');
const firstName = require('@app/search/merchant/statistic/filters/firstName.js');
const gender = require('@app/search/merchant/statistic/filters/gender.js');
const impressionFee = require('@app/search/merchant/statistic/filters/impressionFee.js');
const lastName = require('@app/search/merchant/statistic/filters/lastName.js');
const latitude = require('@app/search/merchant/statistic/filters/latitude.js');
const longitude = require('@app/search/merchant/statistic/filters/longitude.js');
const phone = require('@app/search/merchant/statistic/filters/phone.js');
const state = require('@app/search/merchant/statistic/filters/state.js');
const zip = require('@app/search/merchant/statistic/filters/zip.js');

const filters = [
  address(),
  addressSecondLine(),
  birthdayFrom(),
  city(),
  consumerId(),
  createdAtFrom(),
  deviceId(),
  email(),
  firstName(),
  gender(),
  impressionFee(),
  lastName(),
  latitude(),
  longitude(),
  phone(),
  state(),
  zip(),
];

module.exports = filters;