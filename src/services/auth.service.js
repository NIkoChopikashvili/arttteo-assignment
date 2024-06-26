const bcrypt = require('bcrypt');
const { UserModel } = require('../databse/models');
const { generateAccessAndRefreshToken } = require('../utils/jwt');
const {
  UserAlreadyExist,
  UserNotFound,
  IncorrectPassword,
} = require('../exceptions');
const { hashPassword, comparePassword } = require('../utils/hashing');

/**
 * Registers a new user with the given username, email, and password.
 *
 * @async
 * @param {string} username - The username of the new user.
 * @param {string} email - The email of the new user.
 * @param {string} password - The password of the new user.
 * @returns {Promise<object>} - A promise that resolves to the created user object.
 * @throws {Error} - If there is an error during user creation.
 */
const register = async (username, email, password) => {
  const userExists = await UserModel.findOne({
    where: { username },
    attributes: { exclude: ['password'] },
  });

  if (userExists)
    throw new UserAlreadyExist('User with that username already exists.');

  const hashedPassword = await hashPassword(password);

  const user = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });
  return user;
};

/**
 * Logs in a user with the given username and password.
 *
 * @async
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<{ user: object, token: string }>} - A promise that resolves to an object containing the user and a JWT token.
 * @throws {Error} - If the user is not found or the password is invalid.
 */
const login = async (username, password, res) => {
  try {
    const user = await UserModel.findOne({
      where: { username },
    });

    if (!user)
      throw new UserNotFound('User with that username does not exist.');

    const isCorrect = await comparePassword(password, user.password);

    if (!isCorrect)
      throw new IncorrectPassword('Provided password is incorrect.');

    const { token, refreshToken } = generateAccessAndRefreshToken(user, res);

    return { user, token, refreshToken };
  } catch (err) {
    throw err;
  }
};

/**
 * Retrieves the user by userId, generates new tokens, and sends them in the response.
 *
 * @param {number} userId - The ID of the user to refresh tokens for.
 * @returns {Promise<{ user: UserModel }>} The refreshed user object.
 * @throws {UserNotFound} If no user is found with the given userId.
 */
const refreshToken = async (userId, res) => {
  try {
    const user = await UserModel.findByPk(userId);

    if (!user)
      throw new UserNotFound('User with that credentials does not exist.');

    generateAccessAndRefreshToken(user, res);

    return { user };
  } catch (error) {
    throw error;
  }
};

module.exports = { register, login, refreshToken };
