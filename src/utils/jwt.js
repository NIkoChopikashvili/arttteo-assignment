const jwt = require('jsonwebtoken');

/**
 * Generates a JWT for a given user.
 *
 * @param {Object} user - The user object.
 * @param {string} user.id - The user's ID.
 * @param {string} [user.username] - The user's username.
 * @param {string} secret - The secret key to sign the JWT.
 * @param {import('express').Response} res - The Express response object.
 *
 * @returns {string} - The generated JWT token.
 */
const generateJwt = (exports.generateJwt = (
  user,
  secret,
  expiresIn = '24d',
) => {
  const token = jwt.sign(
    {
      userId: user.id,
      email: user?.email,
      username: user.username,
    },
    secret,
    {
      expiresIn,
    },
  );
  return token;
});

/**
 * Generates access and refresh tokens for a user and sets them as cookies in the response.
 *
 * @param {object} user - The user object for which tokens are generated.
 * @param {object} res - The response object to set cookies.
 * @returns {object} - Returns an object containing the generated access and refresh tokens.
 */
module.exports.generateAccessAndRefreshToken = (user, res) => {
  const token = generateJwt(user, process.env.JWT_SECRET_KEY, '12d');
  const refreshToken = generateJwt(
    user,
    process.env.JWT_SECRET_KEY_REFRESH,
    '24d',
  );
  res.cookie('token', token, {
    maxAge: 24 * 24 * 60 * 60 * 1000, // 24 days
    httpOnly: true,
  });
  res.cookie('token.refresh', refreshToken, {
    maxAge: 24 * 24 * 60 * 60 * 1000, // 24 days
    httpOnly: true,
  });

  return {
    token,
    refreshToken,
  };
};
