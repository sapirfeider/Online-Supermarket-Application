const express = require("express");
const router = express.Router();
const { getCartProducts, insertProductToCart, isProductExistInCart, updateProductInCart,
    deleteProductFromCart, isCartEmpty, deleteShopCart, deleteAllProductFromCart,
    updateQuantityByCustomer } = require("../../controllers/cartActions")
const { isCartExist, createCartShop } = require("../../controllers/cartActions")
const { getValidationFunction } = require("../../validation/validationCartActions")
const { verifyToken } = require("../../controllers/jwt")


router.use(async (req, res, next) => {
    try {
        const verify = await verifyToken(req.headers.authorization)
        if (verify) return next()
    } catch (error) {
        return next(error)
    }
})

router.post("/checkIfCartExist", async (req, res, next) => {

    const { customer_id } = req.body
    console.log("typeof:", typeof (customer_id))
    if (!customer_id || typeof (customer_id) !== "number")
        return next({ message: "customer_id parameter is missing", status: 400 })

    try {
        let shopping_cart_id = null
        const userHasCart = await isCartExist(customer_id);
        console.log(userHasCart)
        if (!userHasCart.length) {
            const newCart = await createCartShop(customer_id);
            console.log("newCart", newCart)
            shopping_cart_id = newCart.insertId
        } else
            shopping_cart_id = userHasCart[0].id

        console.log(shopping_cart_id)
        res.json({ id: shopping_cart_id })

    } catch (error) {
        return next({ message: err, status: 400 })
    }
})

router.post("/getCart", async (req, res, next) => {
    const { cart_id } = req.body
    if (!cart_id || typeof (cart_id) !== "number")
        return next({ message: "cart_id parameter is missing", status: 400 })

    try {
        const cart = await getCartProducts(cart_id);
        res.send(cart)

    } catch (err) {
        console.log("err", err)
        return next({ message: err, status: 400 })
    }
})

router.post("/insertToCart", getValidationFunction("addORdelete_product"), async (req, res, next) => {
    try {
        const isProductExist = await isProductExistInCart(req.body);
        if (!isProductExist.length) {
            const result = await insertProductToCart(req.body);
            if (result)
                return res.json({ message: "Insertion action success" })
            else
                return next({ message: "something went wrong...", status: 400 })
        }
        const updateAction = await updateProductInCart(req.body);
        if (updateAction)
            return res.json({ message: "Update action success" })
        return next({ message: "something went wrong...", status: 400 })
    } catch (err) {
        console.log("err", err)
        return next({ message: err, status: 400 })
    }
})

router.post("/deleteFromCart", getValidationFunction("addORdelete_product"), async (req, res, next) => {
    try {
        const deleteItem = await deleteProductFromCart(req.body);
        if (deleteItem)
            return res.json({ message: "Delete action success" })
        return next({ message: "something went wrong...", status: 400 })

    } catch (err) {
        console.log("err", err)
        return next({ message: err, status: 400 })
    }
})

router.post("/updateQuantity", getValidationFunction("update_quantity"), async (req, res, next) => {

    try {
        if (!req.body.quantity) {
            const deleteItem = await deleteProductFromCart(req.body);
            if (deleteItem)
                return res.json({ message: "Delete action success" })
            return next({ message: "something went wrong...", status: 400 })
        }

        const updateAction = await updateQuantityByCustomer(req.body);
        if (updateAction)
            return res.json({ message: "update quantity of product success" })
        return next({ message: "something went wrong...", status: 400 })

    } catch (err) {
        console.log("err", err)
        return next({ message: err, status: 400 })
    }
})

router.post("/deleteAllProductsCart", async (req, res, next) => {
    const { shopping_cart_key } = req.body
    if (!shopping_cart_key || typeof (shopping_cart_key) !== "number")
        return next({ message: "shopping_cart_key parameter is missing", status: 400 })

    try {
        const deleteProducts = await deleteAllProductFromCart(shopping_cart_key);
        if (deleteProducts)
            return res.json({ message: "Delete products action success" })
        return next({ message: "something went wrong...", status: 400 })

    } catch (err) {
        console.log("err", err)
        return next({ message: err, status: 400 })
    }
})

router.get("/cartStatus", async (req, res, next) => {
    const { shopping_cart_key } = req.query
    if (!shopping_cart_key)
        return next({ message: "shopping_cart_key parameter is missing", status: 400 })

    try {
        const status = await isCartEmpty(shopping_cart_key);
        if (status.length) return res.json({ message: "you have open cart... goodbye" })
        const response = await deleteShopCart(shopping_cart_key)
        if (response)
            return res.json({ message: "delete shop cart success" })
        return next({ message: "something went wrong...", status: 400 })
    } catch (err) {
        console.log("err", err)
        return next({ message: err, status: 400 })
    }
})




module.exports = router;
