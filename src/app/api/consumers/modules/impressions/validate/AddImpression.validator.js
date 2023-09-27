const ValidatorInterface = require('@interfaces/Validator.interface');

/**
 * Class representing a AddImpressionValidator
 * @class
 * @memberOf API.Consumer.Impression.Validate
 * @augments Validator
 */

class AddImpressionValidator extends ValidatorInterface {
  /**
   * Initialize roles.
   * @method
   */
  roles() {
    const { joi: Joi, validator } = this;
    const body = Joi.object().keys({
      sid: Joi.number()
        .integer()
        .min(1)
        .max(100)
        .positive()
        .required()
        .label('SID'),
      cid: Joi.number()
        .integer()
        .min(1)
        .max(100)
        .positive()
        .required()
        .label('CID'),
      latitude: Joi.number()
        .min(-90)
        .max(90)
        .precision(8)
        .required()
        .label('Latitude'),
      longitude: Joi.number()
        .min(-180)
        .max(180)
        .precision(8)
        .required()
        .label('Longitude'),
      deviceId: Joi.string().required().label('Device Id'),
    });
    return [validator.body(body)];
  }
}

module.exports = AddImpressionValidator;
