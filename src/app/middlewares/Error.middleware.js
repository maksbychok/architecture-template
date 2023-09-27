/**
 * @function
 * @param {Error} error - instance of base Error
 * @param {Object} - Express request object
 * @param {Object} - Express response object
 * @param {Function} - Express next function
 */

function errorMiddleware(error, request, response, next) {
  const { status } = error;
  const { message } = error;
  return response.status(status).json({
    status,
    message,
  });
}

module.exports = errorMiddleware;
