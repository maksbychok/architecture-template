/* eslint-disable import/no-unresolved */
const { ConsumerModel } = require('@models');
const consumerFactory = require('@libs/Consumer/Consumer.factory');

const type = 'model-type';
const consumerSlug = 'consumer-type';
const consumerRepo = consumerFactory.repo();

function userType(user) {

  if (user instanceof ConsumerModel) {
    return consumerSlug;
  }
  return false;
}

function userModel(t) {
  if (t === consumerSlug) {
    return consumerRepo;
  }
  return false;
}

function SessionConstructor(user) {
  this[type] = userType(user);
  this.id = user.id || null;
}

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, new SessionConstructor(user));
  });

  passport.deserializeUser((user, done) => {
    const { [type]: t, id } = user;
    const model = userModel(t);
    model
      .findById(id)
      .then((currentUser) => done(null, currentUser))
      .catch((err) => done(err, null));
  });
};
