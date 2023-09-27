const EmailSendGridService = require('./EmailSendGrid.service');

/**
 * Class representing a MailerFactory
 * @class
 */
class MailerFactory {
  
  /**
   * Create Service instance
   * @param {Object} options - The options object.
   * @return {EmailSendGridService} Service instance.
   */
  service(options = {}) {
    return new EmailSendGridService();
  }
}

module.exports = new MailerFactory();