const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');

const { JWT_SK } = process.env;

/**
 * Class representing a Passport Local class
 * @class
 * @memberOf Auth
 */
class PassportLocalAuth {
  /**
   * @constructs PassportLocalAuth
   * @param {string} slug
   * @param {Object} model - Object that represent db model
   * @param {Object} passport - Passport.js object
   */
  constructor(slug, model, passport, mapper) {
    this.model = model;
    this.slug = slug;
    this.passport = passport;
    this.mapper = mapper;
    this.initStrategy();
  }
  /**
   * Initialize passport strategy types
   * @method
   */

  initStrategy() {
    const { slug, model, passport, mapper } = this;
    this.registerStrategy(slug, model, passport, mapper);
    this.loginStrategy(slug, model, passport, mapper);
    this.jwtStrategy(slug, model, passport, mapper);
    this.receiveStrategy(slug, model, passport, mapper);
    this.firstConnectionStrategy(slug, model, passport, mapper);
  }

  /**
   * Initialize passport login strategy
   * @method
   */
  // eslint-disable-next-line class-methods-use-this
  loginStrategy(slug, model, passport) {
    passport.use(
      `${slug}-login`,
      new LocalStrategy(
        {
          usernameField: 'email',
          session: false,
        },
        (email, password, done) => {
          model
            .findOne({
              where: { email },
            })
            .then((user) => {
              if (!user) {
                return done(null, false, 'That email is not registered');
              }
              bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                  throw err;
                }
                return isMatch
                  ? done(null, user)
                  : done(null, false, 'Bad password');
              });
              return false;
            });
        }
      )
    );
  }

  receiveStrategy(slug, model, passport) {
    passport.use(
      `${slug}-receive`,
      new LocalStrategy(
        {
          usernameField: 'id',
          passwordField: 'id',
          session: false,
        },
        (id, password, done) => {
          model
            .findOne({
              where: { id },
            })
            .then((user) => {
              if (!user) {
                return done(null, false, 'That user is not found');
              }
              return done(null, user);
            });
        }
      )
    );
  }

  firstConnectionStrategy(slug, model, passport) {
    const thisIsCertifyToken = this.isCertifyToken;
    passport.use(
      `${slug}-first-connection`,
      new LocalStrategy(
        {
          usernameField: 'token',
          passwordField: 'token',
          session: false,
        },
        (token, password, done) => {
          thisIsCertifyToken(token, JWT_SK)
            .then((decoded) => {
              const { email } = decoded;
              model
                .findOne({
                  where: { email },
                })
                .then((user) => {
                  if (!user) {
                    return done(null, false, 'That user is not found');
                  }
                  return done(null, user);
                });
            })
            .catch((err) => {
              return done(null, false, err.message);
            });
        }
      )
    );
  }

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
   * Initialize passport login strategy
   * @method
   */
  // eslint-disable-next-line class-methods-use-this
  jwtStrategy(slug, model, passport) {
    const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SK,
    };
    passport.use(
      `${slug}-jwt`,
      new JWTStrategy(opts, (payload, done) => {
        return model
          .findOne({
            attributes: {
              exclude: ['password'],
            },
            where: { email: payload.email },
          })
          .then((user) => {
            if (!user) {
              return done(null, false, 'That email is not registered');
            }
            return done(null, user);
          }).catch(console.error)
      })
    );
  }

  /**
   * Initialize passport register strategy
   * @method
   */
  // eslint-disable-next-line class-methods-use-this
  registerStrategy(slug, Model, passport) {
    passport.use(
      `${slug}-register`,
      new LocalStrategy(
        {
          usernameField: 'email',
          passReqToCallback: true,
        },
        (request, email, password, done) => {
          Model.findOne({ where: { email }, paranoid: false }).then((user) => {
            if (user) {
              return done(null, false, 'User already exists');
            }
            const {
              body: { phone },
            } = request;
            const newUser = new Model({
              email,
              password,
              ...(phone && { phone }),
            });
            return newUser
              .save()
              .then(() => done(null, newUser))
              .catch((error) => done(error, false));
          });
        }
      )
    );
  }
}

module.exports = PassportLocalAuth;
