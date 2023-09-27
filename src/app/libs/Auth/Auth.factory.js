const AuthService = require('./Auth.service');

/**
 * Class representing a AuthFactory
 * @class
 * @memberOf Libs.Auth
 */
class AuthFactory {
  /**
   * Create Service instance
   * @param {Object} options - The options object.
   * @return {Object} Service instance.
  */
  service() {
    return new AuthService();
  }
}

module.exports = new AuthFactory();
