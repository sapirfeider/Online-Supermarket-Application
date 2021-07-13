const express = require("express");
const router = express.Router();
const { isShippingDateAvailable, createNewOrder } = require("../../controllers/orders")
const { deleteProductsOfCompletedCart } = require("../../controllers/products")
const { getCartProducts } = require("../../controllers/cartActions")
const fs = require('fs')
const { getValidationFunction } = require("../../validation/validationOrders")
const { verifyToken } = require("../../controllers/jwt")

router.use(async (req, res, next) => {
    try {
        const verify = await verifyToken(req.headers.authorization)
        if (verify) return next()
    } catch (error) {
        return next(error)
    }
})

router.get("/checkShippingDate", async (req, res, next) => {
    const { shipping_date } = req.query
    if (!shipping_date || typeof (shipping_date) !== "string")
        return next({ message: "shipping_date parameter is missing", status: 400 })

    try {
        const shippingDateStatus = await isShippingDateAvailable(shipping_date);
        if (shippingDateStatus.length < 3)
            res.send(true)
        else
            res.send(false)

    } catch (err) {
        console.log("err", err)
        return next({ message: err, status: 400 })
    }
})

router.post("/newOrder", getValidationFunction("new_order"), async (req, res, next) => {
    const { shopping_cart_key, userName } = req.body
    try {
        const newOrder = await createNewOrder(req.body);
        if (newOrder) {
            await createReceipt(shopping_cart_key, userName);
            const productsOfCart = await deleteProductsOfCompletedCart(shopping_cart_key)
            if (!productsOfCart) return next({ message: "something went wrong...", status: 400 })
            return res.send({ message: "order completed and cart products deleted" })
        }
    }
    catch (error) {
        console.log("err", err)
        return next({ message: err, status: 400 })
    }
})

async function createReceipt(cart_id, userName) {
    try {
        const cart = await getCartProducts(cart_id)
        let data = ""
        for (let i = 0; i < cart.length; i++) {
            cart[i].total_price = roundNumber(cart[i].total_price)
            data += `Product Name : ${cart[i].product_name}   Quantity : ${cart[i].quantity} units      Price : ${cart[i].total_price}₪
            \n \n`
        }
        fs.writeFile(__basedir + `/resources/static/assets/uploads/${userName}.txt`, data, (err) => {
            if (err) throw err
        })
    } catch (error) {
        console.log("err", err)
        return next({ message: err, status: 400 })
    }


   function roundNumber(number){
        return Math.round(number * 100) / 100;
    }
}

module.exports = router;
