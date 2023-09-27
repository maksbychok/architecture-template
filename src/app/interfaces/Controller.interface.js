const Express = require('express');
const HTTP_CODES = require('http-status-codes');

/**
 * Abstract class representing a base Controller interface.
 * @abstract
 * @class
 */
class Controller {
  /**
   * @constructs Controller
   * @param {string} path -  The path string for URL.
   */
  constructor(path) {
    this.path = path;
    this.router = Express.Router();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  /**
   * Initialize middlewares.
   * @abstract
   */
  initializeMiddlewares() {
    throw new Error(
      'Controller it`s abstract class. You must override initializeMiddlewares method'
    );
  }

  /**
   * Initialize routers.
   * @abstract
   */
  initializeRoutes() {
    throw new Error(
      'Controller it`s abstract class. You must override initializeRoutes method'
    );
  }

  ok(responce, data) {
    if (data) {
      return responce.status(HTTP_CODES.OK).json(data);
    }
    return responce.sendStatus(HTTP_CODES.OK);
  }

  created(responce, data) {
    if (data) {
      return responce.status(HTTP_CODES.CREATED).json(data);
    }
    return responce.sendStatus(HTTP_CODES.CREATED);
  }

  updated(responce, data) {
    if (data) {
      return responce.status(HTTP_CODES.ACCEPTED).json(data);
    }
    return responce.sendStatus(HTTP_CODES.ACCEPTED);
  }

  deleted(responce, data) {
    return responce.sendStatus(HTTP_CODES.NO_CONTENT);
  }

  notImplemented(responce) {
    return responce.sendStatus(HTTP_CODES.NOT_IMPLEMENTED);
  }
}

module.exports = Controller;
