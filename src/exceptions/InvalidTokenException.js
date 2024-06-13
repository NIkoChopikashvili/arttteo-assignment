/**
 * Custom error class for representing an invalid access token error.
 * Inherits from the built-in Error class.
 *
 * @class InvalidToken
 * @extends Error
 */
class InvalidToken extends Error {
  /**
   * Creates an instance of InvalidToken.
   *
   * @param {string} message - The error message.
   * @param {number} [statusCode=401] - The HTTP status code associated with the error.
   */
  constructor(message, statusCode = 401) {
    super(message);
    this.name = "AccessTokenInvalid";
    this.statusCode = statusCode;
  }
}

module.exports = InvalidToken;
