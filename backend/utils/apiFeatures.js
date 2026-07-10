const express = require("express");
const Invoice = require("../models/invoice");
const Product = require("../models/products");
const { authMiddleware } = require("../middleware/auth");
const asyncHandler = require("./asyncHandler");

const router = express.Router();

router.use(authMiddleware);

// GET /api/features/sales/:timeInterval
router.get(
  "/sales/:timeInterval",
  asyncHandler(async (req, res) => {
    const { timeInterval } = req.params;
    const validIntervals = ["daily", "weekly", "monthly", "yearly", "all"];

    if (!validIntervals.includes(timeInterval)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid timeInterval" });
    }

    const today = new Date();
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
    );

    let fromDate;
    if (timeInterval === "daily") {
      fromDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );
    } else if (timeInterval === "weekly") {
      fromDate = new Date(today);
      fromDate.setDate(fromDate.getDate() - 7);
    } else if (timeInterval === "monthly") {
      fromDate = new Date(today);
      fromDate.setMonth(fromDate.getMonth() - 1);
    } else if (timeInterval === "yearly") {
      fromDate = new Date(today);
      fromDate.setFullYear(fromDate.getFullYear() - 1);
    } else {
      fromDate = new Date(0);
    }

    const userEmail = req.user.email;
    const dateFilter =
      timeInterval !== "all"
        ? { issuedDate: { $gte: fromDate, $lt: endOfDay } }
        : {};

    const productDateFilter =
      timeInterval !== "all"
        ? { "purchasedFrom.purchasingDate": { $gte: fromDate, $lt: endOfDay } }
        : {};

    const [invoices, products] = await Promise.all([
      Invoice.find({ userEmail, ...dateFilter })
        .select("paymentDetails.total")
        .lean(),
      Product.find({ user: userEmail, ...productDateFilter })
        .select("purchasedFrom.purchasingPrice")
        .lean(),
    ]);

    const totalSold = invoices.reduce(
      (sum, inv) => sum + (inv.paymentDetails?.total || 0),
      0,
    );
    const totalPurchased = products.reduce(
      (sum, p) => sum + (p.purchasedFrom?.purchasingPrice || 0),
      0,
    );

    res.status(200).json({
      success: true,
      data: { totalSold, totalPurchased },
    });
  }),
);

module.exports = router;
