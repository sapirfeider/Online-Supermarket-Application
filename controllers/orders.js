const getConnection = require("../database/connectDB")
require("dotenv").config()

async function isShippingDateAvailable(shipping_date) {
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(`SELECT * FROM ${process.env.SCHEMA}.order where shipping_date = ?`, [shipping_date])
    return rows
}

async function createNewOrder(body) {

    const { customer_key, shopping_cart_key, total_price, shipping_city, shipping_street, shipping_date, credit_card } = body
    const query = `INSERT INTO ${process.env.SCHEMA}.order (customer_key, shopping_cart_key, total_price, shipping_city, shipping_street, shipping_date, credit_card) 
    VALUES (?, ?, ?, ?, ?, ?, ?);`
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query, [customer_key, shopping_cart_key, total_price, shipping_city, shipping_street, shipping_date, credit_card])
    return rows.affectedRows
}




module.exports = { isShippingDateAvailable, createNewOrder }