const express = require("express");

const Sale = require("../models/Sale");

const router = express.Router();

router.post("/add", async (req, res) => {

    try {

        const sale = new Sale(req.body);

        await sale.save();

        res.json({
            success: true,
            message: "Sale added successfully"
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

        const sales = await Sale.find()
        .populate("customer")
        .populate("product");

        res.json(sales);

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });

    }

});

router.put("/update/:id", async (req, res) => {

    try {

        await Sale.findByIdAndUpdate(req.params.id, req.body);

        res.json({
            success: true,
            message: "Sale updated successfully"
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });

    }

});

router.delete("/delete/:id", async (req, res) => {

    try {

        await Sale.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Sale deleted successfully"
        });

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });

    }

});

router.get("/daily-report", async (req, res) => {

    try {

        const today = new Date();

        today.setHours(0,0,0,0);

        const tomorrow = new Date(today);

        tomorrow.setDate(tomorrow.getDate() + 1);

        const sales = await Sale.find({
            salesDate: {
                $gte: today,
                $lt: tomorrow
            }
        });

        res.json(sales);

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });

    }

});

router.get("/weekly-report", async (req, res) => {

    try {

        const today = new Date();

        const lastWeek = new Date();

        lastWeek.setDate(today.getDate() - 7);

        const sales = await Sale.find({
            salesDate: {
                $gte: lastWeek,
                $lte: today
            }
        });

        res.json(sales);

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });

    }

});

router.get("/monthly-report", async (req, res) => {

    try {

        const today = new Date();

        const lastMonth = new Date();

        lastMonth.setMonth(today.getMonth() - 1);

        const sales = await Sale.find({
            salesDate: {
                $gte: lastMonth,
                $lte: today
            }
        });

        res.json(sales);

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        });

    }

});

module.exports = router;
