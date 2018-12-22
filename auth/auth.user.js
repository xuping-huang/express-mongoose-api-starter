const jwt = require('jsonwebtoken');
const passport = require('passport');
const debug = require('debug')('apiKit:auth.user');

const passportConfig = require('../common/passport'); // must require, strategy init
const { BadRequestError, AuthenticateError } = require('../common/app-error');
const config = require('../config/env-config');

passportConfig.init();

/**
 * Returns jwt token if valid username and password is provided
 *
 * The password send by request client should be encoded like below:
      const encodeData = crypto.publicEncrypt(publicKey, Buffer.from(password)).toString('base64');
 */
exports.authLocalRSA = (req, res, next) => {
  req.assert(config.login.userNameField, `${config.login.userNameField} cannot be blank`).notEmpty();
  req.assert(config.login.passwordField, `${config.login.passwordField} cannot be blank`).notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    debug(errors);
    return next(new BadRequestError(`${config.login.userNameField} and ${config.login.passwordField} is required.`));
  }

  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new AuthenticateError('User not found.'));
    }
    debug('find user is %s', JSON.stringify(user));
    const token = jwt.sign({
      username: user[config.login.userNameField]
    }, config.jwt.secret, {
      expiresIn: config.jwt.tokenExpire
    });
    return res.json({
      token,
      username: user[config.login.userNameField]
    });
  })(req, res, next);
};
