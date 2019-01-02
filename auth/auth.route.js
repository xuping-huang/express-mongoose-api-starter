const express = require('express');

const authCtrl = require('./auth.user');

const router = express.Router();

/**
 * @swagger
 * definitions:
 *   Login:
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *   LoginBack:
 *     required:
 *       - username
 *       - token
 *     properties:
 *       username:
 *         type: string
 *       token:
 *         type: string
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: login
 */

/**
 * @swagger
 * /auth/user:
 *   post:
 *     description: Login to the application
 *     tags: [Auth]
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         description: User's info.
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Login'
 *     responses:
 *       200:
 *         description: login
 *         schema:
 *           type: object
 *           $ref: '#/definitions/LoginBack'
 */
router.route('/user')
  .post(authCtrl.authLocalRSA);

module.exports = router;
