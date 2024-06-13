/**
 * Express router for handling user authentication.
 *
 * @module authRoutes
 */

const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controllers");
const { Validator } = require("../middlewares");
const {
  createUserValidation,
  userSignInValidation,
} = require("../validations");

const router = express.Router();

router.post("/register", Validator(createUserValidation), registerUser);
router.post("/login", Validator(userSignInValidation), loginUser);

module.exports = router;
