const joi = require('joi');

const new_order_valid = joi.object({
    customer_key: joi.number().required(),
    shopping_cart_key: joi.number().required(),
    total_price: joi.number().required(),
    shipping_city: joi.string().required(),
    shipping_street: joi.string().required(),
    shipping_date: joi.string().required(),
    credit_card: joi.string().required(),
    userName: joi.string().required()
})


const validationsObj = {
    new_order: (req, res, next) => {
        const { error } = new_order_valid.validate(req.body)
        if (error) {
            return next(error.details)
        }
        return next()
    }
}

function getValidationFunction(path) {
    return validationsObj[path]
}


module.exports = { getValidationFunction }