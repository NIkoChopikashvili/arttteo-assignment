const globalErrorHandler = require('./globalErrorHandler.middleware');
const Validator = require('./Validator.middleware');
const { authHandler } = require('./authHandler.middleware');

module.exports = {
  globalErrorHandler,
  Validator,
  authHandler,
};
