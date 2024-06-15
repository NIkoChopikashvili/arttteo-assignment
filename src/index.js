require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { globalErrorHandler } = require('./middlewares');
const { testDbConnection } = require('./databse/db-setup');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const swaggerUI = require('swagger-ui-express');
const logger = require('./utils/logger');
const path = require('path');
const swaggerSpec = require('./swagger');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

require('./config/strategies/google');
require('./config/strategies/facebook');

app.use('/auth', require('./routes/auth.routes'));
app.use('/users', require('./routes/user.routes'));
app.use('/', require('./routes/social-auth.routes'));

app.get('/health', (req, res) => res.status(200).send('OK'));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(globalErrorHandler);

app.listen(port, () => {
  try {
    logger.info(`Server started on port: ${port}`);
    testDbConnection();
  } catch (err) {
    logger.error(err);
  }
});

module.exports = app;
