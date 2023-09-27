const ValidatorInterface = require('@interfaces/Validator.interface');

/**
 * Class representing a ConsumerPhoneVerifyValidator
 * @class
 * @memberOf API.Consumer.Auth.Validate
 * @augments Validator
 */

class ConsumerPhoneVerifyValidator extends ValidatorInterface {
  /**
 * Initialize roles.
 * @method
 */
  roles() {
    const { joi: Joi, validator } = this;
    const body = Joi.object().keys({
      phone: Joi.string()
        .phoneNumber()
        .required()
        .label('Phone'),
      sms: Joi.string()
        .required()
    })
    return [
      validator.body(body)
    ];
  };
}

module.exports = ConsumerPhoneVerifyValidator;