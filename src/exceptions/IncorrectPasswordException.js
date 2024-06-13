/**
 * Custom error class for representing an incorrect password error.
 * Inherits from the built-in Error class.
 *
 * @class IncorrectPassword
 * @extends Error
 */
class IncorrectPassword extends Error {
  /**
   * Creates an instance of IncorrectPassword.
   *
   * @param {string} message - The error message.
   * @param {number} [statusCode=401] - The HTTP status code associated with the error.
   */
  constructor(message, statusCode = 401) {
    super(message);
    this.name = "IncorrectPassword";
    this.statusCode = statusCode;
  }
}

module.exports = IncorrectPassword;
