const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productCode: {
        type: String,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        required: true
    },
    quantitySold: {
        type: Number,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Product", productSchema);
