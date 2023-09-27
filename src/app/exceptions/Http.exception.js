/**
 * @namespace Exception
 */


/**
 * Class representing a base http error
 * @class
 * @augments Error
 */
class HttpException extends Error {
  constructor(status = 500, message = 'Something went wrong') {
    super(message);
    this.status = status;
    this.message = message;
  }
}

module.exports = HttpException;