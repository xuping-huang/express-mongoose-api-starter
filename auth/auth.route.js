const express = require('express');
// const validate = require('express-validation');
// const expressJwt = require('express-jwt');
// const paramValidation = require('../../config/param-validation');
const authCtrl = require('./auth.user');

const router = express.Router(); // eslint-disable-line new-cap

// POST /auth/user
router.route('/user')
  .post(authCtrl.authLocalRSA);
/** POST /api/auth/login - Returns token if correct username and password is provided */
// router.route('/login')
//   .post(validate(paramValidation.login), authCtrl.login);

module.exports = router;
