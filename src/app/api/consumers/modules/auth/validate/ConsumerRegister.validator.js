const ValidatorInterface = require('@interfaces/Validator.interface');

/**
 * Class representing a ConsumerRegisterValidator
 * @class
 * @memberOf API.Consumer.Auth.Validate
 * @augments Validator
 */

class ConsumerRegisterValidator extends ValidatorInterface {
  /**
 * Initialize roles.
 * @method
 */

  roles() {
    const { joi: Joi, validator } = this;
    const body = Joi.object().keys({
      email: Joi.string()
        .email()
        .required()
        .label('Email'),
      phone: Joi.string()
        .phoneNumber()
        .required()
        .label('Phone'),
      password: Joi.string()
        .min(3)
        .max(64)
        .required()
        .label('Password'),

      passwordConfirmation: Joi.any()
        .valid(
          Joi.ref('password')
        )
        .required()
        .messages({
          'any.only': 'Passwords do not match'
        })
        .label('Password confirmation'),
    })
    return [
      validator.body(body)
    ];
  };
}

module.exports = ConsumerRegisterValidator;