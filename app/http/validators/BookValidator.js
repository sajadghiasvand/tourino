const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const validateUpdateBook = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    slug: Joi.string().required(),
    pic: Joi.string().required(),
    desc: Joi.string(),
  });
  return schema.validate(data);
};
const validateLoginUser = (data) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string(),
  });
  return schema.validate(data);
};


module.exports = { validateUpdateBook};
