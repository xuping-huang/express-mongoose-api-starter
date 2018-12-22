const express = require('express');

const authCtrl = require('./auth.user');

const router = express.Router();

// POST /auth/user
router.route('/user')
  .post(authCtrl.authLocalRSA);

module.exports = router;
