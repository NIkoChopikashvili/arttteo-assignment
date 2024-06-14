/**
 * Express router for handling user authentication.
 *
 * @module authRoutes
 */

const express = require('express');
const {
  registerUser,
  loginUser,
  refreshAccessToken,
} = require('../controllers/auth.controller');
const { Validator, authHandler } = require('../middlewares');
const { createUserValidator, userSignInValidator } = require('../validations');

const router = express.Router();

// Register a new user
router.post('/register', Validator(createUserValidator), registerUser);

// Log in a user
router.post('/login', Validator(userSignInValidator), loginUser);

router.post('/refresh/token', authHandler, refreshAccessToken);

module.exports = router;
