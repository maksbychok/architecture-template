/**
 * @namespace API.Consumer
 */
const ModuleInterface = require('@interfaces/Module.interface');
const authFactory = require('@libs/Auth/Auth.factory');
const consumerFactory = require('@libs/Consumer/Consumer.factory');
const ConsumerController = require('./Consumer.controller');
const ConsumerAuthController = require('./modules/auth/ConsumerAuth.controller');
const imprassionModule = require('./modules/impressions/Impression.module');
const formDataMiddleware = require('./middlewares/FormData.middleware');
const apiKeyMiddleware = require('../middlewares/ApiKey.middleware');

/**
 * Class representing a ConsumerModule
 * @class
 * @augments Module
 */
class ConsumerModule extends ModuleInterface {
  /**
   * @constructs ConsumerModule
   * @param {Array<Controller>} controllers -  The controllers that are use this module
   */
  constructor(controllers) {
    super(controllers);
    this.path = 'consumers';
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  /**
   * Initialize middlewares.
   */
  initializeMiddlewares() {
    this.router.use(apiKeyMiddleware);
    this.router.use(formDataMiddleware());
  }

  /**
   * Initialize controllers.
   * @param {Array<Controller>} controllers -  The controllers that are use this module
   */
  initializeControllers(controllers = []) {
    controllers.forEach((controller) => {
      this.router.use(`/${this.path}/`, controller.router);
    });
  }
}

module.exports = new ConsumerModule([
  new ConsumerController(consumerFactory.service()),
  new ConsumerAuthController(authFactory.service(), consumerFactory.service()),
  imprassionModule,
]);
