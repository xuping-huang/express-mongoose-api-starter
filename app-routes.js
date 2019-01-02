const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const authRoutes = require('./auth/auth.route');
const apiRoutes = require('./api/api.route');
const config = require('./config/env-config');

const router = express.Router(); // eslint-disable-line new-cap

/**
 * Swagger-jsdoc
 */
const swaggerDefinition = {
  info: {
    // API informations (required)
    title: 'express-mongoose-api-starter', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'A Boilerplate application for building REST APIs using express, mongoose in ES6', // Description (optional)
  },
  host: `${config.host}:${config.port}`, // Host (optional)
  basePath: '/', // Base path (optional)
};

// Options for the swagger docs
const options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  // Note that this path is relative to the current directory from which the Node.js is ran,
  // not the application itself.
  apis: ['./api/api.route*.js', './auth/auth.route*.js'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

// Serve swagger docs the way you like (Recommendation: swagger-tools)
router.get('/swagger', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => {
  res.send('OK');
});

// mount user routes at /users
router.use('/auth', authRoutes);
router.use('/api', apiRoutes);

module.exports = router;
