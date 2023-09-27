const logger = require('winston');

/**
 * @function
 * @param {Error} err - instance of base Error
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 * @param {Function} next - Express next function
 */

function errorMiddleware(err, request, response, next) {
  const { stack = 'None', status = 500, message = 'Server Error' } = err;
  logger.error(`
  MOBILE API :: 
    status: ${status}
    message: ${message}
    path: ${request.originalUrl}
    method: ${request.method}
    IP: ${request.ip}
    stack:${stack}`);
  response.status(status).json({
    message,
  });
  return response.end();
}

module.exports = errorMiddleware;
