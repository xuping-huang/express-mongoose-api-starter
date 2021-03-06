// const debug = require('debug')('apiKit:auth.user');

const User = require('../model/User');

// const {
//   BadRequestError,
//   AuthenticateError
// } = require('../common/app-error');
// const config = require('../config/env-config');

/**
 * Returns the total number of users
 */
exports.userCount = (req, res, next) => {
  User.count({}, (err, count) => {
    if (err) return next(err);
    return res.json({ count });
  });
};
