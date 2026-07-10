import { Router, type Request, type Response } from "express";
import Invoice from "../models/invoice";
import Product from "../models/products";
import { authMiddleware } from "../middleware/auth";
import { getUser } from "./getUser";

const router = Router();

router.use(authMiddleware);

// GET /api/features/sales/:timeInterval
router.get("/sales/:timeInterval", async (req: Request, res: Response) => {
  try {
    const timeInterval = req.params.timeInterval as string;
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

    let fromDate: Date;
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

    const userEmail = getUser(req).email;
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
      (sum: number, inv: any) => sum + (inv.paymentDetails?.total || 0),
      0,
    );
    const totalPurchased = products.reduce(
      (sum: number, p: any) => sum + (p.purchasedFrom?.purchasingPrice || 0),
      0,
    );

    res
      .status(200)
      .json({ success: true, data: { totalSold, totalPurchased } });
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, error: err.message || "Internal Server Error" });
  }
});

export default router;
