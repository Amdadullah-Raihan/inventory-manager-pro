const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');
const Product = require('../models/products');

router.get('/sales/:userEmail/:timeInterval', async (req, res) => {
    try {
        const userEmail = req.params.userEmail;
        if (!userEmail) {
            return res.status(400).send("Please provide a valid userEmail");
        }

        const timeInterval = req.params.timeInterval;
        if (!['daily', 'weekly', 'monthly', 'yearly', 'all'].includes(timeInterval)) {
            return res.status(400).send("Invalid timeInterval");
        }

        const today = new Date();
        let fromDate;

        if (timeInterval === 'daily') {
            fromDate = new Date(today);
        } else if (timeInterval === 'weekly') {
            fromDate = new Date(today);
            fromDate.setDate(fromDate.getDate() - 7);
        } else if (timeInterval === 'monthly') {
            fromDate = new Date(today);
            fromDate.setMonth(fromDate.getMonth() - 1);
        } else if (timeInterval === 'yearly') {
            fromDate = new Date(today);
            fromDate.setFullYear(fromDate.getFullYear() - 1);
        }

        const invoices = await Invoice.find({
            "userEmail": userEmail,
            "issuedDate": { $gte: fromDate }
        }).select("paymentDetails.total");

        const products = await Product.find({
            "user": userEmail,
            "purchasedFrom.purchasingDate": { $gte: fromDate }
        }).select("purchasedFrom.purchasingPrice");

        const totalSold = invoices.reduce((total, invoice) => total + invoice.paymentDetails.total, 0);

        const totalPurchased = products.reduce((total, product) => total + product.purchasedFrom.purchasingPrice, 0);

        res.json({ totalSold, totalPurchased });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
