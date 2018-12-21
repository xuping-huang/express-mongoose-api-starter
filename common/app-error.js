const httpStatus = require('http-status');

/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(message, httpCode, isCritical = false) {
    super(message);
    this.name = this.constructor.name;
    this.httpCode = httpCode;
    this.isOperational = false; // always false for api
    this.isCritical = isCritical;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   */
  constructor(message, httpCode = httpStatus.INTERNAL_SERVER_ERROR) {
    super(message, httpCode, false);
  }
}

class AuthenticateError extends ExtendableError {
  /**
   * Creates an authenticate fail error.
   */
  constructor(message, httpCode = httpStatus.UNAUTHORIZED) {
    super(message, httpCode, false);
  }
}

class BadRequestError extends ExtendableError {
  /**
   * Creates an bad request error.
   */
  constructor(message, httpCode = httpStatus.BAD_REQUEST) {
    super(message, httpCode, false);
  }
}

module.exports = {
  AuthenticateError, BadRequestError, APIError
};
