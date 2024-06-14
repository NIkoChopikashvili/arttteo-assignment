const express = require('express');
const { authHandler } = require('../middlewares/authHandler.middleware');
const { resultCodes } = require('../enums');

const router = express.Router();

router.get('/profile', authHandler, (req, res) => {
  res.json({ user: req.user, result: resultCodes.SUCCESS });
});

module.exports = router;
