const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true
    },

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    salesDate: {
        type: Date,
        required: true
    },

    paymentMethod: {
        type: String,
        required: true
    },

    totalAmountPaid: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Sale", saleSchema);
