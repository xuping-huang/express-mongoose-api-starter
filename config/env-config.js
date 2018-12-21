const Joi = require('joi');
const debug = require('debug')('apiKit:config');
const dotenv = require('dotenv');
/**
 * Use dotenv to load environment variables from '.env' file.
 * The '.env file not found' error is thrown only in development env.
 * Because in the product env, the variables will be set by other ways.
 *
 * NOTICE: In a production environment, you should inject the PRIVATE_KEY in a more secure way,
 * rather than through the.env file
 */
const result = dotenv.load();

if (result.error && process.env.NODE_ENV === 'development') {
  throw result.error;
}
// By use debug, the console log will not be showed when the env DEBUG not set to 'aipKit'
// debug(result.parsed);
debug('process.env.DEBUG=%s', process.env.DEBUG);

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number()
    .default(8080),
  IS_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  MONGODB_URI: Joi.string().required()
    .description('MongoDB uri required to sign'),
  HOST: Joi.string().required()
    .default('127.0.0.1'),
  LOG_DIRNAME: Joi.string()
    .default('log'),
  LOG_INTERVAL: Joi.string()
    .default('1d'),
  LOG_SIZE: Joi.string()
    .default('10M'),
  LOG_COMPRESS_FORMAT: Joi.string()
    .default('gzip'),
  LOG_FILENAME: Joi.string()
    .default('access.log'),
  PUBLIC_KEY: Joi.string().required()
    .description('public key required to be signed'),
  PRIVATE_KEY: Joi.string().required()
    .description('private key required to be signed'),
  LOGIN_NAME_FIELD: Joi.string()
    .default('email'),
  PASSWORD_FIELD: Joi.string()
    .default('password'),
  LOGIN_USE_EMAIL: Joi.boolean()
    .default(true),
  JWT_TOKEN_EXPIRE: Joi.string()
    .default('1h'),
  JWT_SECRET: Joi.string().required()
    .description('jwt secret required to be signed')
}).unknown().required();

const {
  error,
  value: envVars
} = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  host: envVars.HOST,
  port: envVars.PORT,
  isDebug: envVars.IS_DEBUG,
  privateKey: envVars.PRIVATE_KEY,
  log: {
    dirname: envVars.LOG_DIRNAME,
    interval: envVars.LOG_INTERVAL,
    size: envVars.LOG_SIZE,
    compressFormat: envVars.LOG_COMPRESS_FORMAT,
    filename: envVars.LOG_FILENAME
  },
  mongo: {
    dblink: envVars.MONGODB_URI
  },
  login: {
    userNameField: envVars.LOGIN_NAME_FIELD,
    passwordField: envVars.PASSWORD_FIELD,
    isUseEmailLogin: envVars.LOGIN_USE_EMAIL
  },
  jwt: {
    tokenExpire: envVars.JWT_TOKEN_EXPIRE,
    secret: envVars.JWT_SECRET
  }
};

debug(config);

module.exports = config;
