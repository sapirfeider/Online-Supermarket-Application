const getConnection = require("../database/connectDB")
require("dotenv").config()

async function getCategories() {

    //const connection = await getConnection();
    const [rows] = await global.connection.execute(`SELECT * FROM ${process.env.SCHEMA}.category;`)
    return rows
}


async function getProductsList(categoryId) {
    console.log("getProductsList")
    const query = `select * from ${process.env.SCHEMA}.product where ${process.env.SCHEMA}.product.category_key = ?`
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query, [categoryId])
    return rows
}

async function getProductByKey() {
    const query = `SELECT * FROM ${process.env.SCHEMA}.product`
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query)
    return rows
}


async function deleteProductsOfCompletedCart(shopping_cart_key) {
    const query = `DELETE FROM ${process.env.SCHEMA}.products_cart where shopping_cart_key = ? `
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query, [shopping_cart_key])
    return rows.affectedRows
}


module.exports = { getCategories, getProductsList, getProductByKey, deleteProductsOfCompletedCart }