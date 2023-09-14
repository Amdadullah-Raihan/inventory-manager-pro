const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    barCode: {
        required: true,
        type: Number
    },
    serialNumber: {
        required: true,
        type: Number
    },


    brand: {
        required: true,
        type: String
    },
    purchasedFrom: {
        shopName: { required: true, type: String },
        shopNumber: { required: true, type: String },
        shopAddress: { required: true, type: String },
        puchasingPrice: { required: true, type: Number },
        sellingPrice: { required: true, type: Number },
        purchasingDate: { required: true, type: Date, },
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