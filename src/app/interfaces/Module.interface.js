const Express = require('express');
/**
 * Abstract class representing a base Module interface.
 * @abstract
 * @class
 */
class Module {
  /**
   * @constructs Module
   * @param {Array<Controller>} controllers -  The controllers that are use this module
   */
  constructor(controllers = []) {
    this.router = Express.Router();
    this.path = '';
  }

  /**
   * Initialize controllers.
   * @param {Array<Controller>} controllers -  The controllers that are use this module
   * @abstract
   */
  initializeControllers(controllers = []) {
    throw new Error(
      'Module it`s abstract class. You must override initializeControllers method'
    );
  }

  /**
   * Initialize middlewares.
   * @abstract
   */
  initializeMiddlewares() {}
}

module.exports = Module;
