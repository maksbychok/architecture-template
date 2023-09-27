const ControllerInterface = require('@interfaces/Controller.interface');
const isConsumerMiddleware = require('@api/consumers/middlewares/IsConsumer.middleware');
const impressionFactory = require('@libs/Impression/Impression.factory');
const AddImpressionValidator = require('./validate/AddImpression.validator');

/**
 * Class representing a ImpressionController
 * @class
 * @memberOf API.Consumer.Impression
 * @augments Controller
 */
class ImpressionController extends ControllerInterface {
  /**
   * @constructs ImpressionController
   * @param {Libs.Impression.ImpressionService} impressionService - ImpressionService instance.
   */
  constructor(impressionService) {
    super('');
    this._impressionMapper = impressionFactory.mapper();
    this._impressionService = impressionService;
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
      .get(``, this.index.bind(this))
      .post(``, ...new AddImpressionValidator(), this.store.bind(this));
  }

  /**
   * Consumer get profile.
   * @method
   * @param {Object} - Express request object
   * @param {Object} - Express response object
   * @param {Function} - Express next function
   */
  index(request, response) {
    this.notImplemented(response);
  }

  /**
   * Add impression.
   * @method
   * @param {Object} - Express request object
   * @param {Object} - Express response object
   * @param {Function} - Express next function
   */
  store(request, response, next) {
    const { body, user } = request;
    this._impressionService
      .add(user, body)
      .then((r) =>
        this.ok(response, this._impressionMapper.toEntity(r))
      )
      .catch(next);
  }
}

module.exports = ImpressionController;
