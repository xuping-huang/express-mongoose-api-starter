const express = require('express');
const expressJwt = require('express-jwt');

const config = require('../config/env-config');
const userCtrl = require('./api.user');

const router = express.Router(); // eslint-disable-line new-cap

/**
 * @swagger
 * definitions:
 *   UserCount:
 *     required:
 *       - count
 *     properties:
 *       count:
 *         type: integer
 *         format: int64
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /api/user/count:
 *   get:
 *     description: Returns users count
 *     tags:
 *      - User
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           type: object
 *           $ref: '#/definitions/UserCount'
 */
router.route('/user/count')
  .get(expressJwt({ secret: config.jwt.secret }), userCtrl.userCount);


module.exports = router;
