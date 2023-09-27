/**
 * @namespace Database.Exception
 */

/**
 * Class representing a base Sequelize error
 * @class
 * @augments Error
 */
class SequelizeException extends Error {
  constructor(message = 'Sequelize went wrong') {
    super(message);
    this.message = message;
  }
}

module.exports = SequelizeException;
