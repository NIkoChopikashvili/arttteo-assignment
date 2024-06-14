const { register, login } = require('../services/auth.service');

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

    return res.status(201).json({ user });
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

    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
