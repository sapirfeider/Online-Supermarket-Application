const getConnection = require("../database/connectDB")
require("dotenv").config()

async function isCartExist(customer_id) {
    const query = `SELECT * FROM ${process.env.SCHEMA}.shopping_cart where shopping_cart.customer_id = ?`
    const connection = await getConnection();
    const [rows] = await connection.execute(query, [customer_id])
    return rows;
}

async function createCartShop(customer_id) {
    const query = `INSERT INTO ${process.env.SCHEMA}.shopping_cart (customer_id) VALUES (?)`
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query, [customer_id])
    return rows;
}

async function totalPriceCart(shopping_cart_key) {
    const query = `SELECT SUM(total_price) AS total_price FROM ${process.env.SCHEMA}.products_cart
    WHERE shopping_cart_key = ?`
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query, [shopping_cart_key])
    return rows[0].total_price;
}

async function getCartProducts(cart_id) {
    const query = `SELECT 
    product.id , product.product_name ,  product.image , 
    products_cart.quantity , products_cart.total_price
    FROM
    ${process.env.SCHEMA}.products_cart
       JOIN
       ${process.env.SCHEMA}.product ON ${process.env.SCHEMA}.products_cart.product_key = ${process.env.SCHEMA}.product.id
    WHERE
    ${process.env.SCHEMA}.products_cart.shopping_cart_key = ?`
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query, [cart_id])
    return rows;
}

async function isProductExistInCart(body) {
    const { product_key, shopping_cart_key } = body;
    const query = `SELECT * FROM ${process.env.SCHEMA}.products_cart where shopping_cart_key = ? and product_key = ? `
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query, [shopping_cart_key, product_key])
    return rows;
}

async function insertProductToCart(product_details) {
    const { product_key, quantity, total_price, shopping_cart_key } = product_details
    const query = `INSERT INTO ${process.env.SCHEMA}.products_cart (product_key, quantity, total_price, shopping_cart_key) 
    VALUES (?, ?, ?, ?)`
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query, [product_key, quantity, total_price, shopping_cart_key])
    return rows.affectedRows
}

async function updateProductInCart(product_details) {
    const { product_key, quantity, total_price, shopping_cart_key } = product_details
    const query = `UPDATE ${process.env.SCHEMA}.products_cart SET quantity = ?, total_price = ? WHERE product_key = ? and shopping_cart_key = ?`
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query, [quantity, total_price, product_key, shopping_cart_key])
    return rows.affectedRows
}

async function deleteProductFromCart(body) {
    const { product_key, shopping_cart_key } = body
    const query = `DELETE FROM ${process.env.SCHEMA}.products_cart WHERE product_key = ? and shopping_cart_key = ? `
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query, [product_key, shopping_cart_key])
    return rows.affectedRows
}

async function deleteAllProductFromCart(shopping_cart_key) {
    const query = `DELETE FROM ${process.env.SCHEMA}.products_cart WHERE shopping_cart_key = ?`
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query, [shopping_cart_key])
    return rows.affectedRows
}

async function isCartEmpty(shopping_cart_key) {
    const query = `SELECT * FROM ${process.env.SCHEMA}.products_cart where shopping_cart_key = ?`
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query, [shopping_cart_key])
    return rows;
}

async function deleteShopCart(shopping_cart_key) {
    const query = `DELETE FROM ${process.env.SCHEMA}.shopping_cart WHERE id = ? ;`
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query, [shopping_cart_key])
    return rows.affectedRows;
}

async function updateQuantityByCustomer(body) {
    const { quantity, total_price, product_key } = body
    const query = `UPDATE ${process.env.SCHEMA}.products_cart SET quantity = ?, total_price = ? WHERE product_key = ?`
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query, [quantity, total_price, product_key])
    return rows.affectedRows;
}


async function shoppingCartID(customer_id) {
    const query = `SELECT * FROM ${process.env.SCHEMA}.shopping_cart where customer_id = ? `
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query, [customer_id])
    return rows[0];
}

module.exports = {
    isCartExist, createCartShop, totalPriceCart, getCartProducts, insertProductToCart, isProductExistInCart,
    updateProductInCart, deleteProductFromCart, isCartEmpty, deleteShopCart, deleteAllProductFromCart, updateQuantityByCustomer,
    shoppingCartID
}