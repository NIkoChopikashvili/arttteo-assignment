const InvalidToken = require("./InvalidTokenException");
const UserNotFound = require("./UserNotFoundException");
const UserAlreadyExist = require("./UserAlreadyExistException");
const IncorrectPassword = require("./IncorrectPasswordException");
const PageNotFound = require("./PageNotFoundException");
const GoogleLoginCancelled = require("./GoogleLoginCancelledException");
const FacebookLoginCancelled = require("./FacebookLoginCancelledException");

module.exports = {
  UserAlreadyExist,
  InvalidToken,
  UserNotFound,
  IncorrectPassword,
  PageNotFound,
  GoogleLoginCancelled,
  FacebookLoginCancelled,
};
