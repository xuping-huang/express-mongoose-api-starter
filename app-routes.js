const express = require('express');
const authRoutes = require('./auth/auth.route');
const apiRoutes = require('./api/api.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => {
  res.send('OK');
});

// mount user routes at /users
router.use('/auth', authRoutes);
router.use('/api', apiRoutes);

module.exports = router;
