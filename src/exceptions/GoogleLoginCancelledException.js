/**
 * Custom error class for representing a Google login cancellation error.
 * Inherits from the built-in Error class.
 *
 * @class GoogleLoginCancelled
 * @extends Error
 */
class GoogleLoginCancelled extends Error {
  /**
   * Creates an instance of GoogleLoginCancelled.
   *
   * @param {string} message - The error message.
   * @param {number} [statusCode=500] - The HTTP status code associated with the error.
   */
  constructor(message, statusCode = 500) {
    super(message);
    this.name = "GoogleLoginCancelled";
    this.statusCode = statusCode;
  }
}

module.exports = GoogleLoginCancelled;
