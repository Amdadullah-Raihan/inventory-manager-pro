const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user: {
        required: true,
        type: String,
    },
    productName: {
        required: true,
        type: String
    },
    barCode: {
        required: true,
        type: String
    },
    brand: {
        required: true,
        type: String
    },
    purchasedFrom: {
        type: {
            shopName: { required: true, type: String },
            shopNumber: { required: true, type: String },
            shopAddress: { required: true, type: String },
            purchasingPrice: { required: true, type: Number },
            sellingPrice: { required: true, type: Number },
            purchasingDate: { required: true, type: Date, },
        }
    },
    stock: {
        required: true,
        type: Number
    },
    warranty: {
        required: true,
        type: String
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;