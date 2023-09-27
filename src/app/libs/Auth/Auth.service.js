const jwt = require('jsonwebtoken');
const passport = require('passport');
const HTTP_CODES = require('http-status-codes');
const UnauthorizedException = require('@exceptions/Unauthorized.exception');

const {
  JWT_SK,
  JWT_EXPIRESIN,
  JWT_REFRESH_SK,
  JWT_REFRESH_SK_EXPIRESIN,
} = process.env;

/**
 * Class representing a AuthService
 * @class
 * @memberOf Libs.Auth
 */
class AuthService {
  /**
   * Passport login user
   * @method
   * @param {string} slug - The authenticate slug
   * @param {Object} - Express request object
   * @param {Object} - Express response object
   * @param {Function} - Express next function.
   */
  login(slug, request, response, next) {
    return new Promise((resolve, reject) => {
      passport.authenticate(slug, { session: false }, (err, user, info) => {
        if (err) {
          return reject(err);
        }
        if (!user) {
          return reject(new UnauthorizedException());
        }
        request.login(user, { session: false }, (loginErr) => {
          if (loginErr) {
            return reject(loginErr);
          }
          const token = this.token(user, JWT_SK, JWT_EXPIRESIN);
          const refreshToken = this.token(
            user,
            JWT_REFRESH_SK,
            JWT_REFRESH_SK_EXPIRESIN
          );
          return resolve({
            user,
            token,
            refreshToken,
          });
        });
        return false;
      })(request, response, next);
    });
  }

  /**
   * Passport register user
   * @method
   * @param {string} slug - The authenticate slug
   * @param {Object} - Express request object
   * @param {Object} - Express response object
   * @param {Function} - Express next function.
   */
  register(slug, request, response, next, mapper) {
    return new Promise((resolve, reject) => {
      passport.authenticate(slug, { session: false }, (err, user, info) => {
        if (err) {
          return reject(err);
        }
        if (!user) {
          return reject(new UnauthorizedException(info || 'Authentication failed'));
        }
        request.login(user, { session: false }, (loginErr) => {
          if (loginErr) {
            return reject(loginErr);
          }

          const token = this.token(user, JWT_SK, JWT_EXPIRESIN);
          const refreshToken = this.token(
            user,
            JWT_REFRESH_SK,
            JWT_REFRESH_SK_EXPIRESIN
          );
          return resolve({
            user: mapper.toEntity(user),
            token,
            refreshToken,
          });
        });
        return false;
      })(request, response, next);
    });
  }

  /**
   * Refresh  jwt token.
   * @param {Object} token - The user.
   * @param {string} secret - The secret
   * @return {Object}
   */
  async refreshToken(token, refreshSecret) {
    try {
      const user = await this.isCertifyToken(token, refreshSecret);
      return this.token(user, JWT_SK, JWT_EXPIRESIN);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  receive(slug, request, response, next, mapper) {
    passport.authenticate(slug, { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return response
          .status(HTTP_CODES.UNAUTHORIZED)
          .send({ message: info || 'Authentication failed' });
      }

      const { token } = request.body;

      if (token) {
        const secret = this.jwtSecretKey(user);
        this.isCertifyToken(token, secret)
          .then(() => {
            return response.sendStatus(HTTP_CODES.OK);
          })
          .catch((certifyErr) => {
            return response
              .status(HTTP_CODES.UNAUTHORIZED)
              .send({ message: certifyErr.message });
          });
      }
    })(request, response, next);
  }

  /**
   * Passport first Connection user
   * @method
   * @param {string} slug - The authenticate slug
   * @param {Object} - Express request object
   * @param {Object} - Express response object
   * @param {Function} - Express next function.
   */
  firstConnection(slug, request, response, next, mapper) {
    passport.authenticate(slug, { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      const { token } = request.body;

      if (!user || !token) {
        return response
          .status(HTTP_CODES.UNAUTHORIZED)
          .send({ message: info || 'Authentication failed' });
      }
      request.login(user, { session: false }, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        return response.json({ user: mapper.toEntity(user), token });
      });
      return false;
    })(request, response, next);
  }

  /**
   * Verify whether the signature is valid
   * @param token
   * @param secretKey
   * @returns {Promise<unknown>}
   */
  isCertifyToken(token, secretKey) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }

  /**
   * Generate user jwt token.
   * @param {Object} user - The user.
   * @param {string} secret - The secret
   * @param {string} expiresIn
   * @return {Object}
   */
  token(user, secret, expiresIn) {
    return jwt.sign({ email: user.email }, secret, { expiresIn });
  }

  jwtSecretKey(user) {
    const { email, type, password, createdAt } = user;
    return `${email} - ${type} - ${password} - ${createdAt}`;
  }

  /**
   *
   * @param user
   * @returns {undefined|*}
   */
  generateToken(user, expiresIn) {
    return jwt.sign({ email: user.email }, this.jwtSecretKey(user), {
      expiresIn,
    });
  }
}

module.exports = AuthService;
