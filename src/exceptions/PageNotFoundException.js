/**
 * Custom error class for representing a page not found error.
 * Inherits from the built-in Error class.
 *
 * @class PageNotFound
 * @extends Error
 */
class PageNotFound extends Error {
  /**
   * Creates an instance of PageNotFound.
   *
   * @param {string} message - The error message.
   * @param {number} [statusCode=404] - The HTTP status code associated with the error.
   */
  constructor(message, statusCode = 404) {
    super(message);
    this.name = "PageNotFound";
    this.statusCode = statusCode;
  }
}

module.exports = PageNotFound;
