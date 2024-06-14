const { resultCodes } = require('../enums');
const { register, login, refreshToken } = require('../services/auth.service');

/**
 * Registers a new user.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await register(username, email, password);

    return res.status(201).json({ user, result: resultCodes.SUCCESS });
  } catch (error) {
    next(error);
  }
};

/**
 * Logs in a user.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { user } = await login(username, password, res);

    return res.status(200).json({ user, result: resultCodes.SUCCESS });
  } catch (error) {
    next(error);
  }
};

/**
 * Refreshes user token.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports.refreshAccessToken = async (req, res, next) => {
  try {
    await refreshToken(req.user.userId, res);

    return res.status(200).json({ result: resultCodes.SUCCESS });
  } catch (error) {
    next(error);
  }
};
