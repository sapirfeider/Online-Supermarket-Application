const joi = require('joi');

const addORdelete_product_valid = joi.object({
    product_key: joi.number().required(),
    shopping_cart_key: joi.number().required(),
    quantity : joi.number().optional(), 
    total_price : joi.number().optional()
})

const update_quantity_valid = joi.object({
    quantity: joi.number().required(),
    total_price: joi.number().required(),
    product_key: joi.number().required(),
    shopping_cart_key : joi.number().required()
})



const validationsObj = {
    addORdelete_product: (req, res, next) => {
        const { error } = addORdelete_product_valid.validate(req.body)
        if (error) {
            return next(error.details)
        }
        return next()
    },
    update_quantity: (req, res, next) => {
        const { error } = update_quantity_valid.validate(req.body)
        if (error) {
            return next(error.details)
        }
        return next()
    }
}

function getValidationFunction(path) {
    return validationsObj[path]
}


module.exports = {getValidationFunction}