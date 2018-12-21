// const debug = require('debug')('apiKit:auth.user');

const User = require('../model/User');

// const {
//   BadRequestError,
//   AuthenticateError
// } = require('../common/app-error');
// const config = require('../config/env-config');

/**
 * Returns jwt token if valid username and password is provided
 */
exports.userCount = (req, res, next) => {
  User.count({}, (err, count) => {
    if (err) return next(err);
    return res.json({ count });
  });
};
