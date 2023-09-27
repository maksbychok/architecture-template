const MapperInterface = require('@interfaces/Mapper.interface');

/**
 * Class representing a ImpressionMapper
 * @class
 * @memberOf Libs.Impression
 */
class ImpressionMapper extends MapperInterface {
  /* Map data to app layer.
   * @method
   */
  toEntity(values) {
    if (!values) return values;
    const {
      autoDestructEnabled,
      autoDestructValue,
      title,
      subTitle,
      body,
      isMultiple,
      type,
      imageURL,
      optionalURL,
      link,
    } = values;
    return {
      autoDestructEnabled,
      autoDestructValue,
      title,
      subTitle,
      isMultiple: !!isMultiple,
      body,
      type,
      link,
      imageURL,
      optionalURL,
    };
  }

  /* Map data to db layer.
   * @method
   */
  toDatabase(values) {
    const {
      name,
      price,
      applicationFee,
      impressionFee,
      stripeImpression,
    } = values;
    return {
      ...(name && { name }),
      ...(price && { price }),
      ...(applicationFee && { applicationFee }),
      ...(impressionFee && { impressionFee }),
      ...(stripeImpression && { stripeImpression }),
    };
  }
}

module.exports = ImpressionMapper;
