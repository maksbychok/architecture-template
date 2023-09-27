const { toCurrencyUSD } = require('@libs/Currency');
const EmailNotificationInterface = require('../EmailNotification.interface');

/**
 * Class representing a EmailPaymentIntentSucceededCommand
 * @class
 *
 * @memberOf Notification.Email.EmailPaymentIntentSucceededCommand
 */
class EmailPaymentIntentSucceededCommand extends EmailNotificationInterface {
  /**
   * @constructs EmailPaymentIntentSucceededCommand
   * @param consumer
   * @param request
   */
  constructor(
    consumer = throwParamsError('consumer'),
    {
      intent = throwParamsError('intent'),
    }
  ) {
    super();
    this.templateName = 'consumerPaymentIntentSuccessful';
    this.subjectEmail = 'You payment successful';
    this.from = process.env.EMAIL_MERCHANT_FROM;
    this.to = [];
    this.fromData( intent, consumer);
  }

  /**
   *
   * @param {Object} 
   */
  fromData( intent, consumer) {
    const { email } = consumer;
    this.setTo([email]);
    this.setIntent(intent);
    this.setConsumer(consumer);
  }

  /**
   *
   * @param consumer - the consumer object.
   */
  setConsumer(consumer) {
    this.consumer = consumer;
  }

  /**
   *
   * @param intent - the intent object.
   */
  setIntent(intent) {
    this.intent = intent;
  }
  
  /**
   * Prepare Data For Template
   * @returns {{templateName: string, dynamicTemplateData:Object}}
   */
  prepareDataForTemplate() {
    const { firstName, lastName, email, phone } = this.consumer;
    const {
      amount: price,
      metadata: { webhookCount: count },
    } = this.intent;
    return {
      templateName: this.getTemplateName(),
      dynamicTemplateData: {
        consumerFirstName: firstName,
        consumerLastName: lastName,
        consumerEmail: email,
        consumerPhone: phone,
        intentPrice: toCurrencyUSD(price).format(),
        intentCount: count,
      },
    };
  }
}

function throwParamsError(param) {
  throw new Error(`${param} is required!`);
}

module.exports = EmailPaymentIntentSucceededCommand;
