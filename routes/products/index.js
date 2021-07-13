const express = require("express");
const { getCategories, getProductsList, getProductByKey } = require("../../controllers/products");
const router = express.Router();
const { verifyToken } = require("../../controllers/jwt")

router.use(async (req, res, next) => {
    try {
        const verify = await verifyToken(req.headers.authorization)
        if (verify) return next()
    } catch (error) {
        return next(error)
    }
})

router.get("/getCategories", async (req, res, next) => {
    try {
        const result = await getCategories();
        res.send(result)
    } catch (err) {
        console.log("err", err)
        return next({ message: err, status: 400 })
    }
})

router.post("/productsList", async (req, res, next) => {
    const { categoryId } = req.body
    if (!categoryId || typeof (categoryId) !== "number")
        return next({ message: "category id parameter is missing", status: 400 })

    try {
        const result = await getProductsList(categoryId);
        res.send(result)
    } catch (err) {
        console.log("err", err)
        return next({ message: err, status: 400 })
    }
})

router.get("/searchProducts", async (req, res, next) => {
    const { search_key } = req.query
    try {
        const all_products = await getProductByKey();
        const filterProducts = all_products.filter((product) => {
            if (product.product_name.toLowerCase().includes(search_key.toLowerCase()))
                return product;
        })
        res.send(filterProducts)
    } catch (err) {
        console.log("err", err)
        return next({ message: err, status: 400 })
    }
})


module.exports = router;