const ValidatorInterface = require('@interfaces/Validator.interface');

/**
 * Class representing a ChangePasswordValidator
 * @class
 * @memberOf API.Consumer.Validate
 * @augments Validator
 */

class ChangePasswordValidator extends ValidatorInterface {
  /**
   * Initialize roles.
   * @method
   */
  roles() {
    const { joi: Joi, validator } = this;
    const body = Joi.object().keys({
      oldPassword: Joi.string().min(3).max(65).required().label('Old password'),
      newPassword: Joi.string().min(3).max(65).required().label('New password'),
      passwordConfirmation: Joi.any()
        .valid(Joi.ref('newPassword'))
        .required()
        .label('Password confirmation'),
    });
    return [validator.body(body)];
  }
}

module.exports = ChangePasswordValidator;
