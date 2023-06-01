import e, { Router } from "express";
import User from "../models/Users.js";
import bcrypt from "bcrypt"

const router = Router()

router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login | Boom",
        isLogin: true,
        loginError: req.flash("loginError")
    });
});

router.get("/register", (req, res) => {
    res.render("register", {
        title: "Register | Boom",
        isRegister: true,
        registerError: req.flash("registerError")

    });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        req.flash("loginError", "All fields are required")
        res.redirect("/login")
        return
    }

    const existUser = await User.findOne({ email })
    if (!existUser) {
        req.flash("loginError", "User not found")
        res.redirect("/login")
        return
    }

    const isPassEqual = await bcrypt.compare(password, existUser.password)
    if (!isPassEqual) {
        req.flash("loginError", "Password wrong")
        res.redirect("/login")
        return
    }

    res.redirect("/")
})

router.post("/register", async (req, res) => {

    const { firstname, lastname, email, password } = req.body

    if (!email || !password || !firstname, !lastname) {
        req.flash("registerError", "All fields are required")
        res.redirect("/register")
        return
    }

    const candidate = await User.findOne({ email })
    if (candidate) {
        req.flash("registerError", "User already exist")
        res.redirect("/register")
        return
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userData = {
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: hashedPassword
    }
    const user = await User.create(userData)
    res.redirect("/")
})

export default router