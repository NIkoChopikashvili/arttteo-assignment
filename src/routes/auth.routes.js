/**
 * Express router for handling user authentication.
 *
 * @module authRoutes
 */

const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth.controller');
const { Validator } = require('../middlewares');
const { createUserValidator, userSignInValidator } = require('../validations');

const router = express.Router();

// Register a new user
router.post('/auth/register', Validator(createUserValidator), registerUser);

// Log in a user
router.post('/auth/login', Validator(userSignInValidator), loginUser);

module.exports = router;
