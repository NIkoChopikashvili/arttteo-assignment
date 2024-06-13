require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const { globalErrorHandler } = require("./middlewares");
const { testDbConnection } = require("./config/db-setup");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");

const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cookieParser());
app.use(helmet());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./config/google-strategy");
require("./config/facebook-strategy");

app.use("/", require("./routes/social-auth.routes"));
app.use("/", require("./routes/auth.routes"));
app.use("/", require("./routes/user.routes"));

app.use(globalErrorHandler);

app.listen(port, () => {
  try {
    console.log(`Server started on port: ${port}`);
    testDbConnection();
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
