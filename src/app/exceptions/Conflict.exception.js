const HTTP_CODES = require('http-status-codes');
const HttpException = require('./Http.exception');

/**
 * Class representing a 409(Conflict) http error
 * @class
 * @memberOf Exception
 * @augments Exception.ConflictException
 */
class ConflictException extends HttpException {
  /**
  * @constructs ConflictException
  */
  constructor(message) {
    super(HTTP_CODES.CONFLICT, message || HTTP_CODES.getStatusText(HTTP_CODES.CONFLICT));
  }
}

module.exports = ConflictException;