const HttpException = require('./Http.exception');


/**
 * Class representing a 400(bad request) http error
 * @class
 * @memberOf Exception
 * @augments Exception.BadRequestException
 */
class BadRequestException extends HttpException {
  /**
  * @constructs BadRequestException
  */
  constructor(message) {
    super(400, message || `Bad request`);
  }
}

module.exports = BadRequestException;