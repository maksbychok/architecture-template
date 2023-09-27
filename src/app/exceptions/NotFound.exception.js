const HttpException = require('./Http.exception');


/**
 * Class representing a 404(not found) http error
 * @class
 * @memberOf Exception
 * @augments Exception.NotFoundException
 */
class NotFoundException extends HttpException {
  /**
  * @constructs NotFoundException
  * @param {number} message - The error message
  * @param {number} id - The resource ID
  */
  constructor(message, id) {
    super(404, message || `Resource with id: ${id} not found`);
  }
}

module.exports = NotFoundException;