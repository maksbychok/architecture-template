const MapperInterface = require('@interfaces/Mapper.interface');
const consumerFactory = require('@libs/Consumer/Consumer.factory');

/**
 * Class representing a StatisticMapper
 * @class
 * @memberOf Libs.Statistic
 */
class StatisticConsumerMapper extends MapperInterface {
  /* Map data to app layer.
   * @method
   */
  toEntity(values) {
    if (!values) return values;
    const {
      consumerId: id,
      consumerEmail: email,
      consumerPhone: phone,
      consumerFirstName: firstName,
      consumerLastName: lastName,
      consumerAddress: address,
      consumerAddressSecondLine: addressSecondLine,
      consumerCity: city,
      consumerState: state,
      consumerZip: zip,
      consumerGender: gender,
      consumerBirthday: birthday,
    } = values;
    return {
      id,
      email,
      phone,
      firstName,
      lastName,
      address,
      addressSecondLine,
      city,
      state,
      zip,
      gender,
      birthday,
    };
  }

  /* Map data to db layer.
   * @method
   */
  toDatabase(values) {
    const {
      id: consumerId,
      email: consumerEmail,
      phone: consumerPhone,
      firstName: consumerFirstName,
      lastName: consumerLastName,
      address: consumerAddress,
      addressSecondLine: consumerAddressSecondLine,
      city: consumerCity,
      state: consumerState,
      zip: consumerZip,
      gender: consumerGender,
      birthday: consumerBirthday,
    } = values;
    return {
      ...(consumerId && { consumerId }),
      ...(consumerEmail && { consumerEmail }),
      ...(consumerPhone && { consumerPhone }),
      ...(consumerFirstName && { consumerFirstName }),
      ...(consumerLastName && { consumerLastName }),
      ...(consumerAddress && { consumerAddress }),
      ...(consumerAddressSecondLine && { consumerAddressSecondLine }),
      ...(consumerId && { consumerId }),
      ...(consumerCity && { consumerCity }),
      ...(consumerState && { consumerState }),
      ...(consumerZip && { consumerZip }),
      ...(consumerGender && { consumerGender }),
      ...(consumerBirthday && { consumerBirthday }),
    };
  }
}

module.exports = StatisticConsumerMapper;
