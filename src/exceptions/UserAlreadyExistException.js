/**
 * Custom error class for representing a user already exists error.
 * Inherits from the built-in Error class.
 *
 * @class UserAlreadyExist
 * @extends Error
 */
class UserAlreadyExist extends Error {
  /**
   * Creates an instance of UserAlreadyExist.
   *
   * @param {string} message - The error message.
   * @param {number} [statusCode=403] - The HTTP status code associated with the error.
   */
  constructor(message, statusCode = 403) {
    super(message);
    this.name = 'UserAlreadyExist';
    this.statusCode = statusCode;
  }
}

module.exports = UserAlreadyExist;
