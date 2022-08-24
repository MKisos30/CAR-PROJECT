const Joi = require('joi');

exports.cardValidation = Joi.object({
    name: Joi.string().alphanum().min(2).max(10).required().messages({
        'string.alphanum':"The name must includes only English letters and numbers",
        'string.empty':"Name can not be empty",
        'string.min':"Name must be at least 2 sybmols",
        'string.max':"Name must be maximun 10 sybmols",
    }),
    adress: Joi.string().required().messages({
        'string.empty':"Adress can not be empty",
    }),
    phoneNumber: Joi.string().min(10).pattern(new RegExp('[0-9]{10}'))
    .messages({
        'string.empty':"Phone number can not be empty",
        'string.min':"Phone number must be 10 sybmols",
        'string.pattern.base':"Phone number must includ only numbers",
        'string.base':"Phone number must be only numbers"
    }),
    creditCardNumber: Joi.string().min(8).max(16).messages({
        'string.empty':"Credit card can not be empty",
        'string.min':"Credit card must be min 8 sybmols",
        'string.max':"Credit card must be max 16 sybmols",
        'string.base':"Credit card must be only numbers"
    }), 
    creditCardValidity: Joi.string().min(4).pattern(new RegExp('^(0[1-9]|1[0-2])\/?([0-9]{2})$')).messages({
        'string.empty':"Credit card validity can not be empty",
        'string.min':"Credit card validity must be min 4 sybmols",
        'string.base':"Credit card validity must be only numbers",
    }),
    cvv: Joi.string().min(3).pattern(new RegExp('[0-9]{3}')).messages({
        'string.empty':"Credit card CVV can not be empty",
        'string.min':"Credit card CVV must be 3 sybmols",
        'string.base':"Credit card CVV must be only numbers"
    }),
    idNumber: Joi.string().min(9).pattern(new RegExp('[0-9]{9}')).messages({
        'string.empty':"enter ID number",
        'string.min':"ID number must be 9 sybmols",
        'string.base':"ID number must be only numbers"
    }),
})