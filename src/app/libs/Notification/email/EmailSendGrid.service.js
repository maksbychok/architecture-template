const sgMail = require('@sendgrid/mail');
const errorMiddleware = require('./middlewares/Error.middleware');
const MailerInterface = require('./Mailer.interface');

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY || '');

/**
 * Class representing a EmailSendGridService
 * @class
 */
class EmailSendGridService extends MailerInterface {
  /**
   * @constructs EmailSendGridService
   */
  constructor() {
    super();
    this.mailer = sgMail;
  }

  /**
   * Send emails
   * @param data
   * @returns {Promise<Response>}
   */
  send(data) {
    return this.mailer.send(data)
      .catch(errorMiddleware);
  }
}

module.exports = EmailSendGridService;