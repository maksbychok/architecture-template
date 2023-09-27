const ValidatorInterface = require('@interfaces/Validator.interface');

/**
 * Class representing a UpdateConsumerValidator
 * @class
 * @memberOf API.Consumer.Validate
 * @augments Validator
 */

class UpdateConsumerProfileValidator extends ValidatorInterface {
  /**
   * Initialize roles.
   * @method
   */
  roles() {
    const { joi: Joi, validator } = this;
    const body = Joi.object().keys({
      // phone: Joi.string().optional().empty('').label('Phone'),
      firstName: Joi.string()
        .optional()
        .empty('', null)
        .default(null)
        .label('First name'),
      lastName: Joi.string()
        .optional()
        .empty('', null)
        .default(null)
        .label('Last name'),
      address: Joi.string()
        .optional()
        .empty('', null)
        .default(null)
        .label('Address 1 line'),
      addressSecondLine: Joi.string()
        .optional()
        .empty('', null)
        .default(null)
        .label('Address 2 line'),
      city: Joi.string().optional().empty('', null).default(null).label('City'),
      state: Joi.string()
        .optional()
        .empty('', null)
        .default(null)
        .label('State'),
      zip: Joi.string().optional().empty('', null).default(null).label('ZIP'),
      gender: Joi.string()
        .optional()
        .valid('male', 'female')
        .empty('', null)
        .default(null)
        .label('Gender'),
      birthday: Joi.date()
        .iso()
        .optional()
        .empty('', null)
        .default(null)
        .label('Birthday'),
    });
    return [validator.body(body)];
  }
}

module.exports = UpdateConsumerProfileValidator;
