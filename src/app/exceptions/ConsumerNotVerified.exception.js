const HTTP_CODES = require('http-status-codes');
const HttpException = require('./Http.exception');

/**
 * Class representing a 401 ConsumerNotVerified, http error
 * @class
 * @memberOf Exception
 * @augments Exception.ConsumerNotVerifiedException
 */
class ConsumerNotVerifiedException extends HttpException {
  /**
   * @constructs ConsumerNotVerifiedException
   */
  constructor(message) {
    super(
      HTTP_CODES.UNAUTHORIZED,
      message || 'Consumers with phone number not verified'
    );
  }
}

module.exports = ConsumerNotVerifiedException;
