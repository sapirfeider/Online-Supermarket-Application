const express = require("express")
const AuthRouter = express.Router();
const getValidationFunction = require("../../validation/validationAuth")
const { loginAction, isIdExist, registration } = require("../../controllers/auth")
const { getToken } = require("../../controllers/jwt");

AuthRouter.post("/login", getValidationFunction("login"), async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const result = await loginAction(email, password)
        if (result) {
            const token = await getToken({ id: result.id, role: result.role })
            if (token) {
                console.log("token:", token)
                res.cookie('token', token, {
                    httpOnly: true,
                });
                return res.json({
                    id: result.id,
                    role: result.role,
                    token,
                    user: result.first_name,
                    city: result.city,
                    street: result.street,
                    message: `Hello ${result.first_name}, your login is success`
                })
            }
            return next({ message: "Sorry, your login attempt failed. Please try again", status: 400 })
        }
        return res.json({ unauthorized: true })

    } catch (err) {
        console.log("err", err)
        return next({ message: err, status: 400 })
    }
})

AuthRouter.post("/validId", async (req, res, next) => {
    const { id } = req.body;
    if (!id || typeof (id) !== "number")
        return next({ message: "Id parameter is missing", status: 400 })

    try {
        const result = await isIdExist(id)
        if (result) return res.json({ message: "Sorry, id already exist in system. Please try again", valid: false })
        return res.json({ valid: true })
    } catch (err) {
        console.log("err", err)
        return next({ message: err, status: 400 })
    }
})

AuthRouter.post("/register", getValidationFunction("register"), async (req, res, next) => {
    try {
        const response = await registration(req.body)
        if (response.affectedRows) {
            console.log("registration success")
            const token = await getToken({ id: req.body.id, role: 0 })
            if (token) {
                res.cookie('token', token, {
                    httpOnly: true,
                });
                return res.json({
                    id: req.body.id,
                    role: 0,
                    token,
                    user: req.body.first_name,
                    city: req.body.city,
                    street: req.body.street,
                    message: `Hello ${req.body.first_name}, your login is success`
                })
            }
        }
        return next({ message: "Sorry, your register attempt failed. Please try again...", status: 400 })
    } catch (err) {
        console.log("err", err)
        return next({ message: err, status: 400 })
    }
})

module.exports = AuthRouter;