const express = require('express');
const Product = require('../models/products');
const router = express.Router();


//get all prouducts => /api/products
router.get('/', async (req, res) => {
    try {

        const email = req.query.email;
        console.log("queryStr", req.query);

        let products;

        if (!email) products = await Product.find();

        products = await Product.find({ user: email });


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


//create a new product => /api/products/new
router.post('/new', async (req, res) => {


    console.log(req.body);
    try {

        const product = new Product({
            user: req.body.user,
            productName: req.body.productName,
            barCode: req.body.barCode,
            brand: req.body.brand,
            purchasedFrom: {
                shopName: req.body.purchasedFrom.shopName,
                shopNumber: req.body.purchasedFrom.shopNumber,
                shopAddress: req.body.purchasedFrom.shopAddress,
                purchasingPrice: req.body.purchasedFrom.purchasingPrice,
                sellingPrice: req.body.purchasedFrom.sellingPrice,
                purchasingDate: req.body.purchasedFrom.purchasingDate
            },
            stock: req.body.stock,
            warranty: req.body.warranty

        })
        const result = await product.save();
        res.json({
            success: true,
            result: result
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(err.status).json({ message: err.message });
    }
});

//get a product by id => /api/products/:id
router.get('/:id', async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);
        res.status(200).json({
            success: true,
            product: product
        });
    }
    catch (err) {
        console.log(err);
        res.status(err.status).json({ message: err.message });
    }
});

//update a product by id => /api/products/:id
router.put('/:id', async (req, res) => {
    try {

        await Product.findByIdAndUpdate(req.params.id, {
            //updated body: req.body
        }
        )
    }
    catch (err) {
        console.log(err);
        res.status(err.status).json({
            message: err.message
        })
    }
});

// delete a product by id => /api/products/:id
router.delete('/:id', async (req, res) => {
    try {

        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            deletedProduct: deletedProduct
        });
    }
    catch (err) {
        console.log(err);
        res.status(err.status).json({ message: err.message });
    }
});

module.exports = router;

