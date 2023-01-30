const Joi = require('joi');
const msg = require('../../helper/msg')
const {checkURL} = require("./../../helper/methods");
const {throwError} = require("../../helper/throwError");
const {logger} = require("sequelize/lib/utils/logger");
Joi.objectId = require('joi-objectid')(Joi);

const validateStoreProduct = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'any.required': msg.name,
            'string.empty': msg.name
        }),
        desc: Joi.string().required().messages({
            'any.required': msg.desc,
            'string.empty': msg.desc
        }),
        qty: Joi.number().required().messages({
            'any.required': msg.qty
        }),
        catId: Joi.array().required().messages({
            'any.required': msg.catId
        }),
        brandId: Joi.number().required().messages({
            'any.required': msg.brandId
        }),
    });
    const {error} = schema.validate(data);
    if (error) throwError(error.message)
};
const validateStoreProductItem = (data) => {
    const schema = Joi.object({
        price: Joi.number().required().messages({
            'any.required': msg.price,
        }),
        offPrice: Joi.number().optional(),
        pid: Joi.number().optional(),
        qty: Joi.number().required().messages({
            'any.required': msg.qty
        }),

    });
    const {error} = schema.validate(data);
    if (error) throwError(error.message)
}

const validateStoreComment = (data) => {
    const schema = Joi.object({
        content: Joi.string().required().messages({
            'any.required': msg.desc,
        }),
        UserId: Joi.number().required().messages({
            'any.required': msg.userId,
        }),
        status: Joi.boolean().optional(),
        rate: Joi.number().required().messages({
            'any.required': msg.rate
        }),

    });
    const {error} = schema.validate(data);
    if (error) throwError(error.message)
}

const validateStoreUser = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'any.required': msg.name,
        }),
        family: Joi.string().required().messages({
            'any.required': msg.family,
        }),
        phone: Joi.string().required().messages({
            'any.required': msg.mobile,
        }),
        password: Joi.string().required().messages({
            'any.required': msg.password,
        }),
        role: Joi.string().required().messages({
            'any.required': msg.role,
        }),

        fullName: Joi.string().optional(),
        vcode: Joi.string().optional(),
        fcode: Joi.string().optional(),
    });
    const {error} = schema.validate(data);
    if (error) throwError(error.message)
};

const validateStoreProductField = (data) => {
    const schema = Joi.object({
        key: Joi.string().required().messages({
            'any.required': msg.key,
        }),

        value: Joi.string().required().messages({
            'any.required': msg.value
        }),

    });
    const {error} = schema.validate(data);
    if (error) throwError(error.message)
}
const validateCat = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'any.required': msg.name,
        }),
        status: Joi.boolean().optional()
    });
    const {error} = schema.validate(data);
    if (error) throwError(error.message)
};


module.exports = {
    validateStoreProduct,
    validateStoreUser,
    validateStoreComment,
    validateStoreProductItem,
    validateCat,
    validateStoreProductField
};
