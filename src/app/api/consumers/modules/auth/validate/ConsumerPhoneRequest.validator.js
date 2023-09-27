const ValidatorInterface = require('@interfaces/Validator.interface');

/**
 * Class representing a ConsumerPhoneRequestValidator
 * @class
 * @memberOf API.Consumer.Auth.Validate
 * @augments Validator
 */

class ConsumerPhoneRequestValidator extends ValidatorInterface {
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
    })
    return [
      validator.body(body)
    ];
  };
}

module.exports = ConsumerPhoneRequestValidator;