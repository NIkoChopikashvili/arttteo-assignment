const express = require('express');
const { authHandler } = require('../middlewares/authHandler.middleware');

const router = express.Router();

router.get('/profile', authHandler, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
