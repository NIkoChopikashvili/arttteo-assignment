/**
 * Utility functions for social authentication.
 *
 * @module social-strategy-utils
 */

const { UserModel, UserSocialModel } = require("../models");
const jwt = require("jsonwebtoken");

/**
 * Finds or creates a user based on the social profile information.
 *
 * @param {object} profile - The social profile information.
 * @param {string} source - The source of the social authentication (e.g., "google", "facebook").
 * @returns {Promise<object>} - Returns a promise that resolves to the user object.
 */
const findOrCreateUser = async (profile, source) => {
  const userById = await UserSocialModel.findOne({
    where: {
      socialId: profile.id,
    },
  });

  if (userById) {
    const user = await UserModel.findOne({
      where: {
        id: userById.userId,
      },
    });

    return user;
  }

  // Check if user exists by email
  const email = profile.emails?.[0]?.value;
  if (email) {
    const userByEmail = await UserModel.findOne({
      where: {
        email,
      },
    });
    if (userByEmail && !userById) {
      await UserSocialModel.create({
        socialId: profile.id.toString(),
        email,
        userId: userByEmail.id,
        source,
      });
      await userByEmail.save();
      return userByEmail;
    }
  }

  // If none exists
  const hasBothNames = profile.name?.givenName && profile.name?.familyName;
  if (!hasBothNames && profile.displayName) {
    const splt = profile.displayName.split(" ");
    profile.name = {
      givenName: splt[0],
      familyName: splt.length === 2 ? splt[1] : "",
    };
  }
  const newUser = await UserModel.create({
    email,
    username: profile.name?.givenName,
  });

  await UserSocialModel.create({
    socialId: profile.id.toString(),
    email,
    userId: newUser.id,
    source,
  });

  return newUser;
};

module.exports = { findOrCreateUser };
