const getConnection = require("../database/connectDB")
require("dotenv").config()


async function addProduct(new_product) {
    const { product_name, category_key, price, image } = new_product
    const query = `INSERT INTO ${process.env.SCHEMA}.product (product_name, category_key, price, image) VALUES (?, ?, ?, ?)`
    const connection = await getConnection();
    const [rows] = await connection.execute(query, [product_name, category_key, price, image])
    return rows.affectedRows;
}

async function updateProduct(new_update) {
    const { product_name, price, image, id } = new_update
    const query = `UPDATE ${process.env.SCHEMA}.product SET product_name =? , price = ? , image = ? WHERE id = ?`
    const connection = await getConnection();
    const [rows] = await connection.execute(query, [product_name, price, image, id])
    return rows.affectedRows;
}


module.exports = { addProduct, updateProduct }