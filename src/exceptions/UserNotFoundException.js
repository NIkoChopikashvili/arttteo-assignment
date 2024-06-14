/**
 * Custom error class for representing a user not found error.
 * Inherits from the built-in Error class.
 *
 * @class UserNotFound
 * @extends Error
 */
class UserNotFound extends Error {
  /**
   * Creates an instance of UserNotFound.
   *
   * @param {string} message - The error message.
   * @param {number} [statusCode=404] - The HTTP status code associated with the error.
   */
  constructor(message, statusCode = 404) {
    super(message);
    this.name = 'UserNotFound';
    this.statusCode = statusCode;
  }
}

module.exports = UserNotFound;
