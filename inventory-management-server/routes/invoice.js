const express = require('express');
const Invoice = require('../models/invoice');
const router = express.Router();



// Get invoices for a specific user with optional partial query => /api/invoices/:userEmail?partialQuery=...
router.get('/:userEmail', async (req, res) => {
    try {
        const userEmail = req.params.userEmail;
        const partialQuery = req.query.partialQuery;
        console.log(userEmail, partialQuery);

        if (userEmail && partialQuery) {

            const invoices = await Invoice.find({
                userEmail: userEmail, // Match the specific user's email address

                invoiceNumber: { $regex: `.*${partialQuery}.*`, $options: 'i' } // Partial match on invoiceNumber
            });

            res.status(200).json({
                success: true,
                invoices: invoices
            });
        } else if (userEmail) {
            // Only userEmail is provided
            const invoices = await Invoice.find({ userEmail: userEmail });

            res.status(200).json({
                success: true,
                invoices: invoices
            });
        } else {
            res.status(400).json({
                success: false,
                error: 'User email is missing from the URL or partialQuery is missing from the query parameters.'
            });
        }
    } catch (err) {
        res.status(500).json({
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