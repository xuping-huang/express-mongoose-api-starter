const express = require('express');
const fs = require('fs');
const morganLogger = require('morgan');
const path = require('path');
const devErrorHandler = require('errorhandler');
const rotatingStream = require('rotating-file-stream');
const expressStatusMonitor = require('express-status-monitor');
const compression = require('compression');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const httpStatus = require('http-status');

const { APIError } = require('./common/app-error');
const errorHandler = require('./common/error-handler');
const config = require('./config/env-config');
const router = require('./app-routes');

const app = express();
app.set('host', config.host);
app.set('port', config.port);
app.set('privateKey', config.privateKey);
// Monitor express running at http://host:port/status
app.use(expressStatusMonitor());

// Comment it if choose ngnix to compress response.
app.use(compression());

// Passport
app.use(passport.initialize());

// Create req.body in request object.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/**
 * When validate fail, error response will like below:
  {
    "errors": [{
      "location": "body",
      "msg": "Invalid value",
      "param": "username"
    }]
  }
 */
app.use(expressValidator());

// add cookies obj in req, comment it if no cookies use.
app.use(cookieParser());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Hide the technical details of the site implementation.
app.disable('x-powered-by');

/**
 * Log Handler
 *
 * log only 4xx and 5xx responses to console
 * log all requests to access.log
 *
 * Using roating file stream to save log.
 * If you want save log in one file, change code like below:
 *  app.use(morganLogger('common', {
      stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {
        flags: 'a'
      })
    }));
 */
const logDirectory = path.join(__dirname, config.log.dirname);
if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);

app.use(morganLogger('dev', {
  skip: (req, res) => res.statusCode < 400
}));

// create a rotating write stream
const accessLogStream = rotatingStream(config.log.filename, {
  interval: config.log.interval, // rotate interval
  size: config.log.size,
  compress: config.log.compressFormat,
  path: logDirectory
});

app.use(morganLogger('common', {
  stream: accessLogStream
}));

// Mount all routes on a root path
app.use('', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// Error Handler.
if (config.isDebug) {
  app.use(devErrorHandler());
} else {
  app.use(async (err, req, res, next) => {
    const isOperationalError = await errorHandler.handleError(err);
    if (!isOperationalError) {
      next(err);
    }
  });
  app.use((err, req, res, next) => {
    res.status(500).send('Internal Server Error');
  });
}

exports.app = app;
exports.config = config;
