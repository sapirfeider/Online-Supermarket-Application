const express = require("express");
const router = express.Router();
const { productsCounter, ordersCounter, lastshopping } = require("../../controllers/reports")
const { isCartExist, totalPriceCart, isCartEmpty } = require("../../controllers/cartActions")

router.get("/productStock", async (req, res, next) => {
    console.log("in productStock")
    try {
        const productStock = await productsCounter();
        res.send(productStock)

    } catch (err) {
        console.log("err", err)
        return next({ message: err, status: 400 })
    }
})

router.get("/ordersNumber", async (req, res, next) => {

    try {
        const numOfOrders = await ordersCounter();
        res.send(numOfOrders)

    } catch (err) {
        console.log("err", err)
        return next({ message: err, status: 400 })
    }
})

router.get("/getCartDetails", async (req, res, next) => {
    const { customer_id } = req.query
    if (!customer_id)
        return next({ message: "customer_id parameter is missing", status: 400 })

    try {
        const hasOpenCart = await isCartExist(customer_id);
        if (!hasOpenCart.length) {
            //search last purchase
            const lastPurchase = await lastshopping(customer_id)
            if (lastPurchase)
                return res.send({ case: "last-order", last_order_time: lastPurchase.order_time })

            //user dont created orders yet
            return res.send({ case: "no-purchase" })

        }
        const emptyCart = await isCartEmpty(hasOpenCart[0].id)
        if (!emptyCart.length)
        //its means that user just finish purchase
        {
            const lastPurchase = await lastshopping(customer_id)
            if (lastPurchase)
                return res.send({ case: "last-order", last_order_time: lastPurchase.order_time })
        }

        //user has open cart with products
        const total_price = await totalPriceCart(hasOpenCart[0].id)
        if (total_price)
            return res.send({ case: "open-cart", created_time: hasOpenCart[0].created_time, total_price })
    }
    catch (err) {
        console.log("err", err)
        return next({ message: err, status: 400 })
    }
})

module.exports = router;
