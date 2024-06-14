const InvalidToken = require("./InvalidTokenException");
const UserNotFound = require("./UserNotFoundException");
const UserAlreadyExist = require("./UserAlreadyExistException");
const IncorrectPassword = require("./IncorrectPasswordException");
const GoogleLoginCancelled = require("./GoogleLoginCancelledException");
const FacebookLoginCancelled = require("./FacebookLoginCancelledException");

module.exports = {
  UserAlreadyExist,
  InvalidToken,
  UserNotFound,
  IncorrectPassword,
  GoogleLoginCancelled,
  FacebookLoginCancelled,
};
