const {celebrate, Joi, Segments} = require('celebrate');

module.exports = {
    createUserValidator: celebrate({
        [Segments.BODY]: Joi.object().keys({
            name:Joi.string().required(),
            lastName:Joi.string().required(),
            email:Joi.string().required(),
            password: Joi.string().required(),
            rol : Joi.string().valid('guest','admin','user').required(),
        })
    })
}