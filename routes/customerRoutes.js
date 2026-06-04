const express = require("express");

const Customer = require("../models/Customer");

const router = express.Router();

router.post("/add", async (req, res) => {

    try {

        const customer = new Customer(req.body);

        await customer.save();

        res.json({
            success: true,
            message: "Customer added successfully"
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

        const customers = await Customer.find();

        res.json(customers);

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });

    }

});

module.exports = router;
