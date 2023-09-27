const UnauthorizedException = require('@exceptions/Unauthorized.exception');

const { ANDROID_CLIENT_SECRET } = process.env;

/**
 * @function
 * @param {Object} - Express request object
 * @param {Object} - Express response object
 * @param {Function} - Express next function
 */

function apiKeyMiddleware(request, response, next) {
  const { 'x-api-key': apiKey } = request.headers;
  if (ANDROID_CLIENT_SECRET !== apiKey) {
    return next(
      new UnauthorizedException('The x-api-key header is unauthorized')
    );
  }

  return next();
}

module.exports = apiKeyMiddleware;
