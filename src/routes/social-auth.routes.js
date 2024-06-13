/**
 * Express router for handling Google and Facebook OAuth authentication.
 *
 * @module socialAuthRoutes
 */

const express = require("express");
const passport = require("passport");
const router = express.Router();
const socialAuthControllers = require("../controllers/social-auth.controllers");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/auth/google/callback", socialAuthControllers.googleAuthenticate);

router.get("/auth/facebook", (req, res, next) => {
  passport.authenticate("facebook", {
    scope: ["public_profile"],
    session: false,
  })(req, res, next);
});
router.get("/facebook/redirect", socialAuthControllers.facebookAuthenticate);

module.exports = router;
