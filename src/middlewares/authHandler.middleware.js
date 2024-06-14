const { InvalidToken } = require('../exceptions');
const jwt = require('jsonwebtoken');

/**
 * Middleware to handle JWT authentication.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next middleware function.
 */
module.exports.authHandler = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return next(new InvalidToken('Access token is invalid.'));

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return next(new InvalidToken('Access token is invalid.'));

    req.user = user;
    next();
  });
};
