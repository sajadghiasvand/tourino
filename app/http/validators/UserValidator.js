const Joi = require('joi');
const msg = require("../../helper/msg");
Joi.objectId = require('joi-objectid')(Joi);

const validateCreateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string(),
  });
  return schema.validate(data);
};
const validateLoginUser = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().messages({
      'any.required': msg.mobile,
      'string.empty': msg.mobile
    }),
    password: Joi.string().messages({
      'string.empty': msg.password
    }),
  });
  return schema.validate(data);
};
const validateRegisterUser = (data) => {
  const schema = Joi.object({
    mobile: Joi.string().required().messages({
      'any.required': msg.mobile,
      'string.empty': msg.mobile
    }),
    name: Joi.string().required().messages({
      'any.required': msg.name,
      'string.empty': msg.name
    }),
    family: Joi.string().required().messages({
      'any.required': msg.family,
      'string.empty': msg.family
    }),
    code: Joi.string().required().messages({
      'any.required': msg.code,
      'string.empty': msg.code
    }),
    password: Joi.string().required().messages({
      'any.required': msg.password,
      'string.empty': msg.password
    }),
  });
  return schema.validate(data);
};
const validateForgetUser = (data) => {
  const schema = Joi.object({
    mobile: Joi.string().required().messages({
      'any.required': msg.mobile,
      'string.empty': msg.mobile
    }),
    code: Joi.string().required().messages({
      'any.required': msg.code,
      'string.empty': msg.code
    }),
    password: Joi.string().required().messages({
      'any.required': msg.password,
      'string.empty': msg.password
    }),
  });
  return schema.validate(data);
};


module.exports = { validateCreateUser ,validateLoginUser,validateRegisterUser,validateForgetUser};
