const express = require('express');
const Invoice = require('../models/invoice');
const router = express.Router();



//get all invoices => /api/invoices/
router.get('/', async (req, res) => {
    try {

        const invoices = await Invoice.find({});
        res.status(200).json({
            success: true,
            invoices: invoices
        });
    }
    catch (err) {

        res.status(err.statusCode).json({
            success: false,
            error: err.message
        });
    }
});


//create invoice => /api/invoices/new
router.get('/new', async (req, res) => {
    try {

        const product = new Invoice({

        })

        const result = await product.save();

        res.status(200).json({
            success: true,
            result: result
        });
    }
    catch (err) {

        res.status(err.statusCode).json({
            success: false,
            error: err.message
        });
    }
});

module.exports = router;