const MapperInterface = require('@interfaces/Mapper.interface');

/**
 * Class representing a ConsumerMapper
 * @class
 * @memberOf Libs.Consumer
 */
class ConsumerMapper extends MapperInterface {
  /* Map data to app layer.
   * @method
   */
  toEntity(values) {
    if (!values) return values;
    const {
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
      deviceId,
      verified,
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
      deviceId,
      verified,
    };
  }

  /* Map data to db layer.
   * @method
   */
  toDatabase(values) {
    if (!values) return values;
    const {
      email,
      phone,
      password,
      firstName,
      lastName,
      address,
      addressSecondLine,
      city,
      state,
      zip,
      gender,
      birthday,
      deviceId,
      verified,
    } = values;
    return {
      email,
      ...(password && { password }),
      ...(phone !== undefined && { phone }),
      ...(firstName !== undefined && { firstName }),
      ...(lastName !== undefined && { lastName }),
      ...(address !== undefined && { address }),
      ...(addressSecondLine !== undefined && { addressSecondLine }),
      ...(city !== undefined && { city }),
      ...(state !== undefined && { state }),
      ...(zip !== undefined && { zip }),
      ...(gender !== undefined && { gender }),
      ...(birthday !== undefined && { birthday }),
      ...(deviceId !== undefined && { deviceId }),
      ...(verified !== undefined && { verified }),
    };
  }
}

module.exports = ConsumerMapper;
