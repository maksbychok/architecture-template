/**
 * @namespace API
 */
const ModuleInterface = require('@interfaces/Module.interface');
const consumerModule = require('./consumers/Consumer.module');
const errorMiddleware = require('./middlewares/Error.middleware');

/**
 * Class representing a ApiModule
 * @class
 * @augments Module
 */
class ApiModule extends ModuleInterface {
  /**
 * @constructs ApiModule
 * @param {Array<Controller>} controllers -  The controllers that are use this module
 */
  constructor(controllers) {
    super(controllers);
    this.path = 'api';
    this.initializeControllers(controllers);
    this.initializeMiddlewares();
  }

  /**
 * Initialize middlewares.
 */
  initializeMiddlewares() {
    this.router.use(errorMiddleware);
  }

  /**
   * Initialize controllers.
   * @param {Array<Controller>} controllers -  The controllers that are use this module
   */
  initializeControllers(controllers = []) {
    controllers.forEach(controller => {
      this.router.use(`/${this.path}`, controller.router);
    });
  }
}

module.exports = new ApiModule([
  consumerModule
]);
