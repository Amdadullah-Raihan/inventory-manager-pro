const express = require('express');
const Product = require('../models/products');
const router = express.Router();


//get all prouducts => /api/products
router.get('/', async (req, res) => {
    try {

        const products = await Product.find({});
        res.status(200).json({
            success: true,
            products: products
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

//create a new product
router.post('/new', async (req, res) => {
    try {

        const product = Product.create({
            name: req.body.name,
            barCode: req.body.barCode,
            serialNumber: req.body.serialNumber,
            brand: req.body.brand,
            purchasedFrom: {
                shopName: req.body.shopName,
                shopNumber: req.body.shopNumber,
                shopAddress: req.body.shopAddress,
                purchasingPrice: req.body.purchagingPrice,
                sellingPrice: req.body.sellingPrice,
                purchagingDate: req.body.purchasingDate
            },
            stock: req.body.stock,
            warranty: req.body.warranty

        })
    }
    catch (err) {
        console.log(err);
        res.status(err.status).json({ message: err.message });
    }
});


module.exports = router;

