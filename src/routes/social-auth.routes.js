/**
 * Express router for handling Google and Facebook OAuth authentication.
 *
 * @module socialAuthRoutes
 */

const express = require('express');
const passport = require('passport');
const router = express.Router();
const socialAuthControllers = require('../controllers/social-auth.controller');

// Initiate Google OAuth authentication
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

// Google OAuth callback
router.get('/auth/google/callback', socialAuthControllers.googleAuthenticate);

// Initiate Facebook OAuth authentication2
router.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile'],
    session: false,
  }),
);

// Facebook OAuth callback
router.get('/facebook/redirect', socialAuthControllers.facebookAuthenticate);

module.exports = router;
