const Joi = require('@hapi/joi');
const JoiValidator = require('express-joi-validation');
const JoiPhoneNumber = require('joi-phone-number');

/**
 * Abstract class representing a base Validator interface.
 * @abstract
 * @class
 */
class Validator {
  /**
   * @constructs Validator
   */
  constructor() {
    this.joi = Joi.extend(JoiPhoneNumber);
    this.validator = JoiValidator.createValidator({
      joi: { convert: false },
      passError: true,
    });
    return [this.roles(), this.handler.bind(this)];
  }

  /**
   * Initialize roles.
   * @abstract
   */
  roles() {
    throw new Error(
      'Validator it`s abstract class. You must override roles method'
    );
  }

  /**
   * Initialize error handler.
   * @method
   * @param {Object} - Error object
   * @param {Object} - Express request object
   * @param {Object} - Express response object
   * @param {Function} - Express next function
   */
  handler(err, request, response, next) {
    if (!err) {
      return next();
    }
    if (err && err.error && err.error.isJoi) {
      response.status(422).json({
        type: err.type,
        errors: err.error.details,
      });
    } else {
      return next(err);
    }
    return false;
  }
}

module.exports = Validator;
