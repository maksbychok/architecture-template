const { EventEmitter } = require('events');
const logger = require('winston');

const emmiter = new EventEmitter();

emmiter.on('error', (err) => {
  const { stack = 'None', status = 500, message = 'Server Error' } = err;
  logger.error(`
  IMPRESSION EVENT ERROR :: 
    status: ${status}
    message: ${message}
    stack:${stack}`);
});

module.exports = {
  manager: emmiter,
  events: {
    impressionAdded: Symbol('add-impression')
  }
};