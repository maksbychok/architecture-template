const moment = require('moment');

class ConsumerMapper {

  /**
   * Prepare data for writing to file
   * @param values
   * @returns {{email: *}|*}
   */
  prepareData(values) {
    if (!values) return values;

    const {
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
      deviceId
    } = values; 
    return {
      email,
      ...(phone !== undefined && { 'Mobile': phone }),
      ...(firstName !== undefined && { 'First Name': firstName }),
      ...(lastName !== undefined && { 'Last Name': lastName }),
      ...(address !== undefined && { 'Address': address }),
      ...(addressSecondLine !== undefined && { 'Address (2)': addressSecondLine }),
      ...(city !== undefined && { 'City': city }),
      ...(state !== undefined && { 'State': state }),
      ...(zip !== undefined && { 'Zip': zip }),
      ...(gender !== undefined && { 'Gender': gender }),
      ...(birthday !== undefined && { 'Birthday': this.birthday(birthday) }),
      ...(deviceId !== undefined && { 'Mobile Device ID': deviceId }),
    };
  }

  birthday(date) {
    if (moment(date).isValid()) {
      return moment(date).utc().format('YYYY/MM/DD');
    }
    return '';
  }
}

module.exports = new ConsumerMapper();