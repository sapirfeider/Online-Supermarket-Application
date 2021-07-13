const joi = require('joi');

const new_product_valid = joi.object({
    product_name : joi.string().required(), 
    category_key : joi.number().required(), 
    price : joi.number().required(), 
    image : joi.string().required()
})

const update_product_valid = joi.object({
    product_name : joi.string().required(), 
    price : joi.number().required(), 
    id : joi.number().required(), 
    image : joi.string().required(),
    category_key:joi.number()
})



const validationsObj = {
    add_product: (req, res, next) => {
        const { error } = new_product_valid.validate(req.body)
        if (error) {
            return next(error.details)
        }
        return next()
    },
    update_product: (req, res, next) => {
        const { error } = update_product_valid.validate(req.body)
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