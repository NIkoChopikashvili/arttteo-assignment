const Joi = require("joi");

exports.createUserValidation = Joi.object({
  body: {
    username: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().min(3).required(),
  },
});

exports.userSignInValidation = Joi.object({
  body: {
    username: Joi.string().required(),
    password: Joi.string().min(3).required(),
  },
});
