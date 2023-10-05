const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    invoiceNumber: {
        type: String,
        required: true,
        unique: true,
    },
    issuedDate: {
        type: Date,
        required: true,
    },
    customerDetails: {
        customerName: {
            type: String,
            required: true,
        },
        customerAddress: {
            type: String,
            required: true,
        },
        customerPhoneNo: {
            type: String,
            required: true,
        },
        customerEmail: {
            type: String,
            required: true,
        },
    },
    productDetails: {
        products: [
            {
                productName: {
                    type: String,
                    required: true,
                },
                warranty: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                unitPrice: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
    paymentDetails: {
        subtotal: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        totalPaid: {
            type: Number,
            required: true,
        },
        totalDue: {
            type: Number,
            required: true,
        },
    },
});

// Create a model from the schema
const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
