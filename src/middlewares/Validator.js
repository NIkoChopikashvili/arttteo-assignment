//* Include joi to check error type
const Joi = require("joi");

/**
 * Checks if an object is empty.
 *
 * @param {Object} obj - The object to check.
 * @returns {boolean} - True if the object is empty, false otherwise.
 */
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * Middleware for validating request data using a Joi schema.
 *
 * @param {import("joi").ObjectSchema} validator - The Joi schema to validate against.
 * @returns {function} - The middleware function.
 *
 * @throws {Error} - If the validator does not exist.
 */
module.exports = function Validator(validator) {
  //! If validator does not exist, throw error
  if (!validator) throw new Error(`validator does not exist`);

  return async function (req, res, next) {
    try {
      const { body, query, params } = req;
      const target = {};
      if (!isEmpty(body)) target.body = body;
      if (!isEmpty(query)) target.query = query;
      if (!isEmpty(params)) target.params = params;

      const validated = await validator.validateAsync(target, {
        abortEarly: false,
      });

      req.body = validated.body || {};
      req.query = validated.query || {};
      req.params = validated.params || {};
      next();
    } catch (err) {
      return next(err);
    }
  };
};
