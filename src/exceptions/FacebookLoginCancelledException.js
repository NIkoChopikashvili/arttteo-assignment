/**
 * Custom error class for representing a Facebook login cancellation error.
 * Inherits from the built-in Error class.
 *
 * @class FacebookLoginCancelled
 * @extends Error
 */
class FacebookLoginCancelled extends Error {
  /**
   * Creates an instance of FacebookLoginCancelled.
   *
   * @param {string} message - The error message.
   * @param {number} [statusCode=500] - The HTTP status code associated with the error.
   */
  constructor(message, statusCode = 500) {
    super(message);
    this.name = 'FacebookLoginCancelled';
    this.statusCode = statusCode;
  }
}

module.exports = FacebookLoginCancelled;
