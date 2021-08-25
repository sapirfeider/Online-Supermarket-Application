require("dotenv").config()
const express = require("express")
const api = express();
const bodyParser = require("body-parser")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const http = require("http")
const socket = require("socket.io")
const getConnection = require("./database/connectDB")
const AuthRouter = require("./routes/auth/index")
const productsRouter = require("./routes/products/index")
const cartRouter = require("./routes/cartActions/index")
const adminRouter = require("./routes/adminActions/index")
const reportRouter = require("./routes/current_report/index")
const ordersRouter = require("./routes/orders/index")
const downloadRouter = require("./routes/downloadFile/index")
const path = require('path');

const server = http.createServer(api)
const socketCors = {
    cors:
        { origin: "*" }
}

global.__basedir = __dirname;

initConnection()

async function initConnection(){
    global.connection = await getConnection();
}

api.use(bodyParser.json())
api.use(cookieParser());

api.use(express.static('./dist/supermarket'));

api.get("/check", (req, res, next) => {
    return res.send("check success!")
})

api.use("/auth", AuthRouter)

api.use("/products", productsRouter)

api.use("/cart", cartRouter)

api.use("/admin", adminRouter)

api.use("/report", reportRouter)

api.use("/orders", ordersRouter)

api.use("/", downloadRouter)

api.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/supermarket/index.html'), err => {
        if (err) {
            res.status(500).send(err)
        }
    })
});

api.use((error, req, res, next) => {
    console.log("error details:", error)
    const errorMessage = error.message || error[0].message
    const status = error.status || 400
    return res.status(status).send(errorMessage)
})

const socketServer = new socket.Server(server, socketCors)
socketServer.on("connection", (socket) => {
    console.log("new connection is created...")

})


global.socket = socketServer;

server.listen(process.env.PORT, () => {
    console.log(`server start listen to port ${process.env.PORT}`)
})


