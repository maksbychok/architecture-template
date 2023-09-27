const multer = require('multer');
/**
 * @function
 * @param {Object} - Express request object
 * @param {Object} - Express response object
 * @param {Function} - Express next function
 */

function formDataMiddleware() {
  return multer().none();
}

module.exports = formDataMiddleware;
