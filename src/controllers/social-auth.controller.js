const passport = require('passport');
const { generateAccessAndRefreshToken } = require('../utils/jwt');
const {
  GoogleLoginCancelled,
  FacebookLoginCancelled,
} = require('../exceptions');

/**
 * Middleware for handling Facebook OAuth authentication.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function in the stack.
 * @throws {FacebookLoginCancelled} If Facebook login is cancelled or encounters an error.
 */
exports.facebookAuthenticate = async (req, res, next) => {
  passport.authenticate('facebook', { session: false }, async (err, user) => {
    try {
      if (!user || err)
        throw new FacebookLoginCancelled('Facebook login cancelled');

      let redirectUrl = `${process.env.API_URL}/users/profile`;

      generateAccessAndRefreshToken(user, res);
      return res.redirect(redirectUrl);
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

/**
 * Middleware for handling Google OAuth authentication.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function in the stack.
 * @throws {GoogleLoginCancelled} If Google login is cancelled or encounters an error.
 */
exports.googleAuthenticate = async (req, res, next) => {
  passport.authenticate('google', { session: false }, async (err, user) => {
    try {
      if (!user || err)
        throw new GoogleLoginCancelled('Google login cancelled');

      let redirectUrl = `${process.env.API_URL}/users/profile`;

      generateAccessAndRefreshToken(user, res);
      return res.redirect(redirectUrl);
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};
