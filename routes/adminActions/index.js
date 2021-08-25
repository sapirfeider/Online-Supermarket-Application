const express = require("express");
const router = express.Router();
const { addProduct, updateProduct } = require("../../controllers/adminActions")
const { getProductsList } = require("../../controllers/products")
const { getValidationFunction } = require("../../validation/validationAdminActions")
const { verifyToken } = require("../../controllers/jwt")

router.use(async (req, res, next) => {
    try {
        const verify = await verifyToken(req.headers.authorization)
        if (verify) return next()
    } catch (error) {
        return next(error)
    }
})

router.post("/addProduct", getValidationFunction("add_product"), async (req, res, next) => {
    try {
        const InsertResponse = await addProduct(req.body);
        if (InsertResponse) {
            const updated_prodcuts_list = await getProductsList(req.body.category_key)
            global.socket.emit('updated_products_list', updated_prodcuts_list)
            return res.json({ message: "Insert action success" })
        }
        return next({ message: "Something went wrong...", status: 400 })
    } catch (err) {
        console.log("err", err)
        return next({ message: err, status: 400 })
    }
})


router.post("/updateProduct", getValidationFunction("update_product"), async (req, res, next) => {
    try {
        const updateResponse = await updateProduct(req.body);
        if (updateResponse) {
            const updated_prodcuts_list = await getProductsList(req.body.category_key)
            global.socket.emit('updated_products_list', updated_prodcuts_list)
            return res.json({ message: "update action success" })
        }

        return next({ message: "Something went wrong...", status: 400 })

    } catch (err) {
        console.log("err", err)
        return next({ message: err, status: 400 })
    }
})



module.exports = router;
