/**
 * Google authentication strategy configuration using Passport.js.
 * This module sets up the Google strategy for Passport to enable
 * user authentication via Google OAuth.
 *
 * @module google-strategy
 */

const passport = require("passport");
const googleOauth = require("passport-google-oauth20");
const { findOrCreateUser } = require("../utils/social-strategy-utils");

const GoogleStrategy = googleOauth.Strategy;

module.exports = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${
        process.env.API_URL || `http://localhost:${process.env.PORT}`
      }/auth/google/callback`,
      passReqToCallback: true,
    },
    /**
     * Google authentication callback.
     *
     * @param {object} req - The request object.
     * @param {string} accessToken - The access token provided by Google.
     * @param {string} refreshToken - The refresh token provided by Google.
     * @param {object} profile - The user's profile information from Google.
     * @param {function} done - Callback to pass control back to Passport.
     */
    async (req, accessToken, refreshToken, profile, done) => {
      if (!profile.emails?.[0]?.value) {
        return done(new Error("Email not found for Google account"));
      }
      try {
        const user = await findOrCreateUser(profile, "google");
        done(null, user);
      } catch (err) {
        console.log(err);
        return done(err);
      }
    }
  )
);
