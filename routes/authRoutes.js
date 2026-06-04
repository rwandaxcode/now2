const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {

        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword
        });

        await newUser.save();

        res.json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

router.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.json({
                success: false,
                message: "Incorrect password"
            });
        }

        req.session.user = user;

        res.json({
            success: true,
            message: "Login successful"
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }

});

router.get("/logout", (req, res) => {

    req.session.destroy();

    res.json({
        success: true,
        message: "Logged out"
    });

});

module.exports = router;
