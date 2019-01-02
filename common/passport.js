const debug = require('debug')('apiKit:auth.passport');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const config = require('../config/env-config');
const User = require('../model/User');
const { AuthenticateError } = require('../common/app-error');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in using Name(or Email) and Password.
 */
passport.use(new LocalStrategy({
  usernameField: config.login.userNameField,
  passwordField: config.login.passwordField
}, (username, password, done) => {
  const query = {};
  query[config.login.userNameField] = username.toLowerCase();
  debug('search condition:%s', JSON.stringify(query));

  User.findOne(query, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(new AuthenticateError(`User account ${username} not found.`));
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }
      if (isMatch) {
        debug('user is matched: %s', user);
        return done(null, user);
      }
      return done(new AuthenticateError('Invalid user account or password.'));
    });
  });
}));

exports.init = () => { /* no use, just for lint */ };
