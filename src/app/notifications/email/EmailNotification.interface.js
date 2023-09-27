const emailTemplate = require('@libs/Notification/email/EmailTemplate.service');
const mailerFactory = require('@libs/Notification/email/Mailer.factory');
const PreparerTemplateVariables = require('@notifications/email/config/PreparerTemplateVariables');

const preparerTemplateVariables = new PreparerTemplateVariables();

/**
 * Abstract class representing a base EmailEventsInterface interface.
 * @abstract
 * @class
 */
class EmailNotificationInterface {
 
  /**
   * @constructs Controller
   */
  constructor() {
    this._emailTemplate = emailTemplate;
    this._mailerFactory = mailerFactory.service();
    this._customConfigVariables = true;
    this.fromName = process.env.EMAIL_FROM_NAME;
  }
  
  setContactName() {
    throw new Error(
      'EmailEventsInterface it`s abstract class. You must override setContactName method'
    );
  }
  
  /**
   * Initialize fromData.
   * @abstract
   */
  fromData() {
    throw new Error(
      'EmailEventsInterface it`s abstract class. You must override fromData method'
    );
  }
  
  /**
   * Return template name for email
   * @returns {string}
   */
  getTemplateName() {
    if (typeof this.templateName === 'undefined') {
      throw new Error('Doesn't exist template name');
    }
    return this.templateName;
  }
  
  /**
   *
   * @param to
   */
  setTo(to = throwParamsError('to')) {
    this.to = to;
  }
  
  /**
   * Sets a variable for a template (Password for user account)
   * @param password
   */
  setPassword(password) {
    if (typeof password === 'undefined') {
      throw new Error('`Password` is required! ');
    }
    
    this.password = password;
  }
  
  
  /**
   * Prepare Data For Template
   * @returns {{templateName: string, dynamicTemplateData: {password, contactName: ({length}|*), email: (*|string)}}}
   */
  prepareDataForTemplate() {
    return {
      templateName: this.getTemplateName(),
      dynamicTemplateData: {
        contactName: this.contactName,
        password: this.password,
        email: this.to
      },
    };
  }
  
  /**
   * Message for email (content)
   * @returns {{subject: string, from: string, html: string, to: (*|string)}}
   */
  message(to) {
    const preparedData = this.prepareDataForTemplate();
    if (this._customConfigVariables) {
      preparedData.dynamicTemplateData = {
        ...preparedData.dynamicTemplateData,
        ...preparerTemplateVariables.prepareVariables()
      };
    }
  
    return {
      to,
      from: {
        email: this.from,
        name: this.fromName,
      },
      subject: this.subjectEmail,
      html: this._emailTemplate.setTemplateData(preparedData),
    };
  }
  
  /**
   * send Email
   */
  sendEmail() {
    this.to.forEach((email) => {
      this._mailerFactory.send(this.message(email));
    });
  }
}

function throwParamsError(param) {
  throw new Error(`${param} is required!`);
}

module.exports = EmailNotificationInterface;