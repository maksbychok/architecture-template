/**
 * Abstract class representing a base Mailer interface.
 * @abstract
 * @class
 */
class Mailer {
  /**
   * Send email
   * @param data
   * @abstract
   */
  send() {
    throw new Error(
      'Mailer it`s abstract class. You must override send method'
    );
  }
}

module.exports = Mailer;
