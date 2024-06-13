const { resultCodes } = require("../enums");

/**
 * Global error handling middleware.
 *
 * @param {Error} error - The error object.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next middleware function.
 */
const globalErrorHandler = async (error, req, res, next) => {
  if (error) {
    const statusCode = error.statusCode || 500;

    console.log(error);

    res.status(statusCode).json({
      result: resultCodes.ERROR,
      error: {
        name: error.name,
        message: error.message,
      },
    });
  } else {
    next();
  }
};

module.exports = globalErrorHandler;
