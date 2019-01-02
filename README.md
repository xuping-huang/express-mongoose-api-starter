# Overview

This is a boilerplate application for building REST APIs in Node.js + Express + Mongoose. Helps you stay productive by following best practices. Follows Airbnb's Javascript style guide.

## Install & Run

$ npm install  
$ npm run start

# Features

| Feature | Summary |
|---|---|
|Console log auto removed in product env|Through `'debug'`, you can write console log freedom, don't need remove it before publish.|
|Logging with rotating file|Through using `'morgan'`, the log will be save to files in log dir.|
|Error grading and centralized processing|All errors are centralized in one place and additional processing is distinguished between operational errors and critical errors.|
|Express status monitor|You can monitor express status by `http://server:port/status`|
|Restart express after change|Use `'nodemon'` in package.json to monitor code change and restart express auto.|
|Response compression|Use `'compression'` auto compress the response of the express server. |
|Express start script split|Split a large express start script file to three parts. `App.js` is responsible for connecting databases and launching express server. `App-express.js` is responsible for express environment seeting. `App-routes.js` is responsible for all api routes. |
|Convert the variables in process.env to config object|Through `'dotenv'` load the env variables from `'.env'` and use `'joi'` validation and convert to config object. All action in `'./config/env-config.js'`. |
|API security with JWT|Using JSON Web Token to authenticate users that request access.|
|Detailed comments|Detailed comments for each code line. Help you understand the kit quicker.|
|Docker Deployment|Deploy the entire operating environment with one command `docker-compose up` and support data initialization for the mongo database.|

# Scripts

| Script | Summary |
|---|---|
|npm run debug|Set env=development and DEBUG=apiKit, the debug() will print info to console.|
|npm run start|Start express.|
|npm run lint|Use eslint to check code style with 'Airbnb JavaScript Style Guide' rules.|
|npm run test|Running api test with mocha.|

# Passport

> See more detail in [Passport](/doc/passport.md)

| Supported Auth | Summary |
|---|---|---|
| Local RSA | Authenticated with name & password, password was encrypted by RSA before transfer. |

# Docker Demployment

 - Configuration: `Dockfile`, `docker-compose.yml`
 - DB Data Import: `db/user.json`, `db/import.sh`
 - Running: `docker-compose up`  

# Develop Dependenices

| The Third Library | Summary |
|---|---|
|chai|BDD/TDD assertion library for node.js and the browser. |
|eslint|An AST-based pattern checker for JavaScript|
|eslint-config-airbnb-base|Airbnb's base JS ESLint config, following our styleguide.|
|eslint-plugin-chai-friendly|This plugin overrides no-unused-expressions to make it friendly towards chai expect and should statements.|
|eslint-plugin-import|This plugin intends to support linting of ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names. All the goodness that the ES2015+ static module syntax intends to provide, marked up in your editor.|
|mocha|Simple, flexible, fun JavaScript test framework for Node.js & The Browser. |
|nodemon|nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.|
|nyc|Istanbul's state of the art command line interface, with support for: 1)applications that spawn subprocesses. 2)ES2015 transforms, via babel-plugin-istanbul, or source-maps.|
|sinon|JavaScript test spies, stubs and mocks|
|sinon-mongoose|Extend Sinon stubs for Mongoose methods to test chained methods easily.|
|supertest|HTTP assertions made easy via superagent.|

# Running Dependenices

| The Third Library | Summary |
|---|---|
|bcrypt-nodejs|Native JS implementation of BCrypt for Node. |
|body-parser|Parse incoming request bodies in a middleware before your handlers, available under the req.body property.|
|chalk|Terminal string styling done right.|
|cheerio|Fast, flexible & lean implementation of core jQuery designed specifically for the server.|
|compression|Node.js compression middleware. The following compression codings are supported:deflate,gzip|
|cookie-parser|Parse Cookie header and populate req.cookies with an object keyed by the cookie names.|
|cors|CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.|
|debug|A tiny JavaScript debugging utility modelled after Node.js core's debugging technique. Works in Node.js and web browsers.|
|dotenv|Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. |
|errorhandler|This middleware is only intended to be used in a development environment, as the full error stack traces and internal details of any object passed to this module will be sent back to the client when an error occurs.|
|express|Fast, unopinionated, minimalist web framework for node.|
|express-flash|Flash Messages for your Express Application.|
|express-status-monitor|Simple, self-hosted module based on Socket.io and Chart.js to report realtime server metrics for Express-based node servers.|
|express-validator|An express.js middleware for validator.|
|helmet|Helmet helps you secure your Express apps by setting various HTTP headers. |
|http-status|Utility to interact with HTTP status code.|
|joi|Object schema description language and validator for JavaScript objects.|
|jsonwebtoken|An implementation of JSON Web Tokens.|
|lusca|Web application security middleware.|
|mongoose|Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.|
|morgan|HTTP request logger middleware for node.js|
|multer|Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.|
|nodemailer|Easy as cake e-mail sending from your Node.js application|
|passport|Simple, unobtrusive authentication for Node.js.|
|passport-jwt|Passport authentication strategy using JSON Web Tokens.|
|popper.js|A library used to position poppers in web applications.A popper is an element on the screen which "pops out" from the natural flow of your application. Common examples of poppers are tooltips, popovers and drop-downs.|
|request|Used by express status monitor.|
|rotating-file-stream|Creates a stream.Writable to a file which is rotated. Rotation behaviour can be deeply customized; optionally, classical UNIX logrotate behaviour can be used.|
|validator|A library of string validators and sanitizers.|
