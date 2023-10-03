const express = require('express');
const Invoice = require('../models/invoice');
const router = express.Router();



//get all invoices => /api/invoices/
router.get('/', async (req, res) => {
    try {
        const userEmail = req.query.userEmail;

        let invoice;

        if (!userEmail) invoice = await Invoice.find();

        invoice = await Invoice.find({ userEmail: userEmail });

        res.status(200).json({
            success: true,
            invoice: invoice
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
router.post('/new', async (req, res) => {

    try {

        const product = new Invoice(req.body)

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