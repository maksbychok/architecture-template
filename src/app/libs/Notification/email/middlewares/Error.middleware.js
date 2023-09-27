const logger = require('winston');

/**
 * @function
 * @param {Error} error - instance of base Error
 * @returns {string}
 */
function generateBodyErrors(error) {
  const { errors } = error.response.body || error;
  return JSON.stringify(errors, null, 2);
}

/**
 * @function
 * @returns {string}
 */
function getStackTraceError() {
  Error.prepareStackTrace = (error, stack) => {
    return stack;
  };
  const e = new Error();
  Error.captureStackTrace(e, errorMiddleware);
  return e.stack[0];
}

/**
 * @function
 * @param {Error} error - instance of base Error
 */
function errorMiddleware(error) {
  const { code = '4xx', message = 'Error' } = error;
  logger.error(`
  EMAIL ERROR ::
    code: ${code}
    message: ${message}
    errors:${generateBodyErrors(error)}
    stackTrace:${getStackTraceError()}
    `);
}

module.exports = errorMiddleware;
