const getConnection = require("../database/connectDB")
require("dotenv").config()

async function loginAction(email, password) {

    const query = `select * from  ${process.env.SCHEMA}.users where users.email = ? and users.password = ?`
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query, [email, password])
    return rows[0]
}

async function isIdExist(id) {

    const query = `select * from  ${process.env.SCHEMA}.users where id = ?`
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query, [id])
    return rows[0]
}

async function registration(body) {
    const { id, email, password, first_name, last_name, city, street ,phone} = body;
    const query = `INSERT INTO ${process.env.SCHEMA}.users (id, first_name, last_name, email, password, city, street , phone) 
                   VALUES (?, ?, ?, ?, ?, ?, ? , ?)`
    //const connection = await getConnection();
    const [rows] = await global.connection.execute(query, [id, first_name, last_name, email, password, city, street, phone])
    return rows;
}

module.exports = { loginAction, isIdExist, registration }