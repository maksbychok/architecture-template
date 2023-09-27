const EmailPaymentIntentSucceededCommand = require('./EmailPaymentIntentSucceeded.command');

/**
 * Class representing a EmailNotificationFactory
 * @class
 */
class EmailNotificationFactory {
  /**
   * Create command instance
   * @param {Object} options - The options object.
   *
   */
  command({ action = '', request, consumer }) {
    switch (action.trim()) {
      case 'intent-successful':
        return new EmailPaymentIntentSucceededCommand(consumer, request);
      default:
        throw new Error(`Unknown action - '${action}'.`);
    }
  }
}

module.exports = new EmailNotificationFactory();
