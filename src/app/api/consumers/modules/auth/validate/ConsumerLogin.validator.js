const ValidatorInterface = require('@interfaces/Validator.interface');

/**
 * Class representing a ConsumerLoginValidator
 * @class
 * @memberOf API.Consumer.Auth.Validate
 * @augments Validator
 */

class ConsumerLoginValidator extends ValidatorInterface {
  /**
 * Initialize roles.
 * @method
 */
  roles() {
    const { joi: Joi, validator } = this;
    const body = Joi.object().keys({
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().min(3).required().label('Password'),
    })
    return [
      validator.body(body)
    ];
  };
}

module.exports = ConsumerLoginValidator;