const passport = require('passport');
const UnauthorizedException = require('@exceptions/Unauthorized.exception');

/**
 * @function
 * @param {Object} - Express request object
 * @param {Object} - Express response object
 * @param {Function} - Express next function
 */

function isConsumerMiddleware(request, response, next) {
  passport.authenticate('consumer-jwt', { session: false }, (error, user) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return next(new UnauthorizedException());
    }
    request.user = user;
    return next();
  })(request, response, next);
}

module.exports = isConsumerMiddleware;
