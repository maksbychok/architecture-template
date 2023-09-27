const Express = require('express');
const passport = require('passport');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const serialize = require('@auth/Serialize.auth');
const winstonInstance = require('winston');
const errorMiddleware = require('@middlewares/Error.middleware');
const cors = require('cors');
const xss = require('xss-clean');
const HTTP_CODES = require('http-status-codes');

process.env.ROOT_DIR = __dirname;

function initializeMiddlewares() {
  this.app.use(
    cors({
      origin: '*',
    })
  );
  this.app.use(bodyParser.json());
  this.app.use(bodyParser.urlencoded({ extended: true }));
  this.app.use(Express.static(`${__dirname}/public`));
  this.app.use('/uploads', Express.static(`${__dirname}/uploads`));
  this.app.use(helmet());
  this.app.use(xss());
}

function initializePassport() {
  this.app.use(passport.initialize());
  this.app.use(passport.session());
  serialize(passport);
}

function initializeErrorHandling() {
  this.app.use(errorMiddleware);
}

function initializeModules(modules) {
  modules.forEach((mod) => {
    this.app.use('/', mod.router);
  });
}

function initializeLogger() {
  winstonInstance.add(
    new winstonInstance.transports.File({
      filename: './logs/logfile.log',
      maxsize: 5242880,
      maxFiles: 5,
      json: false,
      format: winstonInstance.format.combine(
        winstonInstance.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winstonInstance.format.simple()
      ),
    })
  );
}

function healthCheck() {
  this.app.get('/', (request, responce) => {
    return responce.sendStatus(HTTP_CODES.OK);
  });
}
class App {
  constructor(modules, port) {
    this.app = Express();
    this.port = port;
    this.app.use(function (req, res, next) {
      req.socket.setKeepAlive();
      next();
    });
    initializeMiddlewares.call(this);
    initializePassport.call(this);
    initializeModules.call(this, modules);
    initializeErrorHandling.call(this);
    initializeLogger.call(this);
    healthCheck.call(this);
  }

  listen() {
    this.app.listen(this.port, () => {
      global.console.log(`App listening on the port ${this.port}`);
    });
  }
}

module.exports = App;
