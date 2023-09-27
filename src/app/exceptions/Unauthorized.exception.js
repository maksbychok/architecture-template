const HTTP_CODES = require('http-status-codes');
const HttpException = require('./Http.exception');

/**
 * Class representing a 401 UnauthorizedError, http error
 * @class
 * @memberOf Exception
 * @augments Exception.UnauthorizedException
 */
class UnauthorizedException extends HttpException {
  /**
   * @constructs UnauthorizedException
   */
  constructor(message) {
    super(
      HTTP_CODES.UNAUTHORIZED,
      message || HTTP_CODES.getStatusText(HTTP_CODES.UNAUTHORIZED)
    );
  }
}

module.exports = UnauthorizedException;
