const ControllerInterface = require('@interfaces/Controller.interface');
const { ConsumerModel } = require('@models');
const passport = require('passport');
const PassportLocalAuth = require('@auth/PassportLocal.auth');
const consumerFactory = require('@libs/Consumer/Consumer.factory');
const ConsumerNotVerifiedException = require('@exceptions/ConsumerNotVerified.exception');
const ConsumerLoginValidator = require('./validate/ConsumerLogin.validator');
const ConsumerRegisterValidator = require('./validate/ConsumerRegister.validator');
const ConsumerPhoneRequestValidator = require('./validate/ConsumerPhoneRequest.validator');
const ConsumerPhoneVerifyValidator = require('./validate/ConsumerPhoneVerify.validator');

const { JWT_REFRESH_SK } = process.env;

/**
 * Class representing a ConsumerAuthController
 * @class
 * @memberOf API.Consumer.Auth
 * @augments Controller
 */
class ConsumerAuthController extends ControllerInterface {
  /**
   * @constructs ConsumerAuthController
   */
  constructor(authService, consumerService) {
    super('auth');
    this._authService = authService;
    this._consumerService = consumerService;
    this._consumerMapper = consumerFactory.mapper();
  }

  /**
   * Initialize middlewares.
   * @method
   */
  initializeMiddlewares() {
    new PassportLocalAuth('consumer', ConsumerModel, passport);
  }

  /**
   * Initialize routers.
   * @method
   */
  initializeRoutes() {
    this.router
      .get(`/${this.path}/logout`, this.logout.bind(this))
      .post(
        `/${this.path}/register`,
        ...new ConsumerRegisterValidator(),
        this.register.bind(this)
      )
      .post(
        `/${this.path}/phone/request`,
        ...new ConsumerPhoneRequestValidator(),
        this.phoneRequest.bind(this)
      )
      .post(
        `/${this.path}/phone/verify`,
        ...new ConsumerPhoneVerifyValidator(),
        this.phoneVerify.bind(this)
      )
      .post(
        `/${this.path}/login`,
        ...new ConsumerLoginValidator(),
        this.login.bind(this)
      )
      .post(`/${this.path}/token`, this.refreshToken.bind(this));
  }

  /**
   * Consumer verify token handler.
   * @method
   * @param {Object} - Express request object
   * @param {Object} - Express response object
   * @param {Function} - Express next function handler
   *
   */
  phoneVerify(request, response, next) {
    const {
      body: { phone, sms },
    } = request;
    this._consumerService
      .verifySMS(phone, sms)
      .then((valid) => this.ok(response, { valid }))
      .catch(next);
  }

  /**
   * Consumer refresh token handler.
   * @method
   * @param {Object} - Express request object
   * @param {Object} - Express response object
   * @param {Function} - Express next function handler
   *
   */
  refreshToken(request, response, next) {
    const { token } = request.body;
    this._authService
      .refreshToken(token, JWT_REFRESH_SK)
      .then((newToken) => this.ok(response, { token: newToken }))
      .catch(next);
  }

  /**
   * Consumer phone request handler.
   * @method
   * @param {Object} - Express request object
   * @param {Object} - Express response object
   * @param {Function} - Express next function handler
   *
   */
  phoneRequest(request, response, next) {
    const {
      body: { phone },
    } = request;
    this._consumerService
      .sendVerifySMS(phone)
      .then(() => this.ok(response))
      .catch(next);
  }

  /**
   * Consumer logout handler.
   * @method
   * @param {Object} - Express request object
   * @param {Object} - Express response object
   * @param {Function} - Express next function handler
   *
   */
  logout(request, response) {
    request.logout();
    this.ok(response);
  }

  /**
   * Consumer login handler.
   * @method
   * @param {Object} - Express request object
   * @param {Object} - Express response object
   * @param {Function} - Express next function handler
   *
   */
  login(request, response, next) {
    this._authService
      .login('consumer-login', request, response, next)
      .then((loginResponce) => {
        const { user } = loginResponce;
        if (!user.verified) {
          throw new ConsumerNotVerifiedException();
        }
        return loginResponce;
      })
      .then(({ user, ...tokens }) => {
        this.ok(response, {
          user: this._consumerMapper.toEntity(user),
          ...tokens,
        });
      })
      .catch(next);
  }

  /**
   * Consumer register handler.
   * @method
   * @param {Object} - Express request object
   * @param {Object} - Express response object
   * @param {Function} - Express next function handler
   *
   */
  register(request, response, next) {
    request.on('error', function (err) {
      console.log(err);
    });
    this._authService
      .register(
        'consumer-register',
        request,
        response,
        next,
        consumerFactory.mapper()
      )
      .then((user) => {
        this.ok(response, { user });
      })
      .catch(next);
  }
}
module.exports = ConsumerAuthController;
