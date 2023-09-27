/**
 * @namespace API.Consumer.Impression
 */

const ModuleInterface = require('@interfaces/Module.interface');
const impressionFactory = require('@libs/Impression/Impression.factory');
const statisticFactory = require('@libs/Statistic/Statistic.factory');
const ImpressionListener = require('./Impression.listener');
const ImpressionController = require('./Impression.controller');


/**
 * Class representing a ImpressionModule
 * @class
 * @augments Module
 */
class ImpressionModule extends ModuleInterface {
  /**
 * @constructs ImpressionModule
 * @param {Array<Controller>} controllers -  The controllers that are use this module
 */
  constructor(controllers) {
    super(controllers);
    new ImpressionListener(
      statisticFactory.service()
    );
    this.path = 'impressions';
    this.initializeControllers(controllers);
    this.initializeMiddlewares();
  }

  /**
 * Initialize middlewares.
 */
  initializeMiddlewares() {
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

module.exports = new ImpressionModule(
  [
    new ImpressionController(
      impressionFactory.service()
    )
  ]
);
