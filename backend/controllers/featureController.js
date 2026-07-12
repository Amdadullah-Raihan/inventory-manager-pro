const Invoice = require("../models/invoice");
const Product = require("../models/products");

// GET /api/features/sales/:timeInterval
exports.getSalesData = async (req, res) => {
  const userEmail = req.user.email;
  const timeInterval = req.params.timeInterval;

  const validIntervals = ["daily", "weekly", "monthly", "yearly", "all"];
  if (!validIntervals.includes(timeInterval)) {
    return res.status(400).send("Invalid timeInterval");
  }

  const today = new Date();
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1,
  );
  let fromDate;

  switch (timeInterval) {
    case "daily":
      fromDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );
      break;
    case "weekly":
      fromDate = new Date(today);
      fromDate.setDate(fromDate.getDate() - 7);
      break;
    case "monthly":
      fromDate = new Date(today);
      fromDate.setMonth(fromDate.getMonth() - 1);
      break;
    case "yearly":
      fromDate = new Date(today);
      fromDate.setFullYear(fromDate.getFullYear() - 1);
      break;
    default:
      fromDate = new Date(0);
  }

  const dateFilter =
    timeInterval !== "all" ? { $gte: fromDate, $lt: endOfDay } : undefined;

  const invoices = await Invoice.find({
    userEmail,
    ...(dateFilter && { issuedDate: dateFilter }),
  }).select("paymentDetails.total");

  const products = await Product.find({
    user: userEmail,
    ...(dateFilter && { "purchasedFrom.purchasingDate": dateFilter }),
  }).select("purchasedFrom.purchasingPrice");

  const totalSold = invoices.reduce(
    (sum, i) => sum + i.paymentDetails.total,
    0,
  );
  const totalPurchased = products.reduce(
    (sum, p) => sum + p.purchasedFrom.purchasingPrice,
    0,
  );

  res.json({ totalSold, totalPurchased });
};
