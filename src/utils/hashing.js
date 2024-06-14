const bcrypt = require('bcrypt');
const logger = require('./logger');

/**
 * Hashes a password using bcrypt.
 *
 * @param {string} password - The password to hash.
 *
 * @returns {Promise<string>} - The hashed password.
 */
exports.hashPassword = async password => {
  const hashedPwd = await bcrypt.hash(password, 12);
  return hashedPwd;
};

/**
 * Compares a given password with a hashed password.
 *
 * @param {string} password - The password to compare.
 * @param {string} userPwd - The hashed password to compare against.
 *
 * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match, otherwise false.
 */
exports.comparePassword = async (password, userPwd) => {
  try {
    const isCorrect = await bcrypt.compare(password, userPwd);
    return isCorrect;
  } catch (error) {
    logger.error(error);
    return false;
  }
};
