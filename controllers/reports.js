const getConnection = require("../database/connectDB")
require("dotenv").config()

async function productsCounter() {

    //const connection = await getConnection();
    const [rows] = await global.connection.execute(`select count(*) as product_stock from ${process.env.SCHEMA}.product`)
    return rows[0]
}

async function ordersCounter() {

    //const connection = await getConnection();
    const [rows] = await global.connection.execute(`select count(*) as  num_of_orders from ${process.env.SCHEMA}.order`)
    return rows[0]
}

async function lastshopping(customer_id) {

    const query = `SELECT * FROM ${process.env.SCHEMA}.order where customer_key = ? order by order_time desc`
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query, [customer_id])
    return rows[0]
}

module.exports = { lastshopping, productsCounter, ordersCounter }