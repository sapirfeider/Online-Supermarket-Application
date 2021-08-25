const joi = require('joi');

const login_valid = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
})

const register_valid = joi.object({
    id: joi.number().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    city: joi.string().required(),
    street: joi.string().required(),
    phone: joi.string().required()
})


const validationsObj = {
    login: (req, res, next) => {
        const { error } = login_valid.validate(req.body)
        if (error) {
            return next(error.details)
        }
        return next()
    },
    register: (req, res, next) => {
        const { error } = register_valid.validate(req.body)
        if (error) {
            return next(error.details)
        }
        return next()
    }
}

function getValidationFunction(path) {
    return validationsObj[path]
}


module.exports = getValidationFunction