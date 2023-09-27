const ControllerInterface = require('@interfaces/Controller.interface');
const consumerFactory = require('@libs/Consumer/Consumer.factory');
const isConsumerMiddleware = require('./middlewares/IsConsumer.middleware');
const UpdateConsumerProfileValidator = require('./validate/UpdateProfile.validator');
const ChangePasswordValidator = require('./validate/ChangePassword.validator');

/**
 * Class representing a ConsumerController
 * @class
 * @memberOf API.Consumer
 * @augments Controller
 */
class ConsumerController extends ControllerInterface {
  /**
   * @constructs ConsumerController
   */
  constructor(consumerService) {
    super('profile');
    this._consumerService = consumerService;
    this._consumerMapper = consumerFactory.mapper();
  }

  /**
   * Initialize middlewares.
   * @method
   */
  initializeMiddlewares() {
    this.router.use(`/${this.path}`, isConsumerMiddleware);
  }

  /**
   * Initialize routers.
   * @method
   */
  initializeRoutes() {
    this.router
      .get(`/${this.path}`, this.index.bind(this))
      .delete(`/${this.path}`, this.destroy.bind(this))
      .put(
        `/${this.path}`,
        ...new UpdateConsumerProfileValidator(),
        this.update.bind(this)
      )
      .put(
        `/${this.path}/password`,
        ...new ChangePasswordValidator(),
        this.changePassword.bind(this)
      );
  }

  /**
   * Consumer get profile.
   * @method
   * @param {Object} - Express request object
   * @param {Object} - Express response object
   * @param {Function} - Express next function
   */
  index(request, response, next) {
    const { user } = request;
    this._consumerService
      .profile(user)
      .then((profile) => {
        this.ok(response, this._consumerMapper.toEntity(profile));
      })
      .catch(next);
  }

  /**
   * Merchant change password.
   * @method
   * @param {Object} - Express request object
   * @param {Object} - Express response object
   * @param {Function} - Express next function
   */
  changePassword(request, response, next) {
    const { body: dto, user } = request;
    this._consumerService
      .changePassword(user, dto)
      .then(() => {
        this.updated(response);
      })
      .catch(next);
  }

  /**
   * Consumer update profile.
   * @method
   * @param {Object} - Express request object
   * @param {Object} - Express response object
   * @param {Function} - Express next function
   */
  update(request, response, next) {
    const { user, body: dto } = request;
    this._consumerService
      .update(user, dto)
      .then(() => {
        this.updated(response);
      })
      .catch(next);
  }

  /**
   * Consumer destroy profile.
   * @method
   * @param {Object} - Express request object
   * @param {Object} - Express response object
   * @param {Function} - Express next function
   */
  destroy(request, response, next) {
    const { user } = request;
    this._consumerService
      .destroy(user)
      .then(() => {
        this.deleted(response);
      })
      .catch(next);
  }
}
module.exports = ConsumerController;
