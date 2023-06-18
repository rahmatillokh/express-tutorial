import jwt from "jsonwebtoken"
import User from "../models/Users.js"

export default async function (req, res, next) {
    if (!req.cookies.token) {
        res.redirect("/login")
        return
    }

    const token = req.cookies.token
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decode.userID)
    req.userID = user._id
    next()
}