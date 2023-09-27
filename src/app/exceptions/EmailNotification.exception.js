/**
 * @namespace Exception
 */


/**
 * Class representing a base http error
 * @class
 * @augments Error
 */
class EmailNotificationException extends Error {
  constructor(message = 'Something went wrong', info) {
    super(message);
    this.info = info;
    this.message = message;
  }
}

module.exports = EmailNotificationException;