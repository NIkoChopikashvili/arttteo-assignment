/**
 * Facebook authentication strategy configuration using Passport.js.
 * This module sets up the Facebook strategy for Passport to enable
 * user authentication via Facebook OAuth.
 *
 * @module facebook-strategy
 */

const passport = require("passport");
const facebookOauth = require("passport-facebook");
const { findOrCreateUser } = require("../utils/social-strategy-utils");

const FacebookStrategy = facebookOauth.Strategy;

let facebookClientId = process.env.CLIENT_ID_FB;
let facebookClientSecret = process.env.CLIENT_SECRET_FB;

if (!facebookClientId || !facebookClientSecret) {
  throw new Error("Facebook client ID and secret must be provided");
}

module.exports = passport.use(
  new FacebookStrategy(
    {
      clientID: facebookClientId,
      clientSecret: facebookClientSecret,
      callbackURL: `${
        process.env.API_URL || `http://localhost:${process.env.PORT}`
      }/facebook/redirect`,
      profileFields: ["id", "email", "name"],
    },
    /**
     * Facebook authentication callback.
     *
     * @param {string} accessToken - The access token provided by Facebook.
     * @param {string} refreshToken - The refresh token provided by Facebook.
     * @param {object} profile - The user's profile information from Facebook.
     * @param {function} done - Callback to pass control back to Passport.
     */
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateUser(profile, "facebook");
        done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
