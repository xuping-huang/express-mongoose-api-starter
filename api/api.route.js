const express = require('express');
const expressJwt = require('express-jwt');

const config = require('../config/env-config');
const userCtrl = require('./api.user');

const router = express.Router(); // eslint-disable-line new-cap

// GET /api/user/count
router.route('/user/count')
  .get(expressJwt({
    secret: config.jwt.secret
  }), userCtrl.userCount);

module.exports = router;
