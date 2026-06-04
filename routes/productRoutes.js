const express = require("express");

const Product = require("../models/Product");

const router = express.Router();

router.post("/add", async (req, res) => {

    try {

        const product = new Product(req.body);

        await product.save();

        res.json({
            success: true,
            message: "Product added successfully"
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });

    }

});

router.get("/", async (req, res) => {

    try {

        const products = await Product.find();

        res.json(products);

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });

    }

});

module.exports = router;
