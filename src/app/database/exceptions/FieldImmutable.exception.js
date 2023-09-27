const SequelizeException = require('./Sequelize.exception');

/**
 * @namespace Database.Exception
 */

/**
 * Class representing a base Sequelize error
 * @class
 * @augments Error
 */
class FieldImmutableException extends SequelizeException {
  constructor(field) {
    const message = `Do not try to set the '${field}' value!`;
    super(message);
    this.message = message;
  }
}

module.exports = FieldImmutableException;
