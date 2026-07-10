import { type Request, type Response } from "express";
import { invoiceService } from "../services/invoiceService";
import { productService } from "../services/productService";
import { paginationSchema, createInvoiceSchema } from "../validators/schemas";

export const invoiceController = {
  async getLatestNumber(req: Request, res: Response) {
    const number = await invoiceService.getLatestInvoiceNumber(req.user!.email);
    res.status(200).json({ success: true, greatestInvoiceNumber: number });
  },

  async list(req: Request, res: Response) {
    const params = paginationSchema.parse(req.query);
    const result = await invoiceService.list(req.user!.email, params);

    res.status(200).json({
      success: true,
      data: result.invoices,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        pages: Math.ceil(result.total / result.limit),
      },
    });
  },

  async getById(req: Request, res: Response) {
    const invoice = await invoiceService.getById(
      req.user!.email,
      req.params.id,
    );

    if (!invoice) {
      return res
        .status(404)
        .json({ success: false, error: "Invoice not found" });
    }

    res.status(200).json({ success: true, data: invoice });
  },

  async create(req: Request, res: Response) {
    const data = createInvoiceSchema.parse(req.body);
    const invoice = await invoiceService.create(req.user!.email, data);

    res.status(201).json({ success: true, data: invoice });
  },

  async delete(req: Request, res: Response) {
    const invoice = await invoiceService.delete(req.user!.email, req.params.id);

    if (!invoice) {
      return res
        .status(404)
        .json({ success: false, error: "Invoice not found" });
    }

    res.status(200).json({ success: true, message: "Invoice deleted" });
  },

  async deleteMany(req: Request, res: Response) {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No invoice IDs provided" });
    }

    const result = await invoiceService.deleteMany(req.user!.email, ids);

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} invoice(s) deleted`,
      deletedCount: result.deletedCount,
    });
  },

  async getSales(req: Request, res: Response) {
    const { timeInterval } = req.params;
    const validIntervals = ["daily", "weekly", "monthly", "yearly", "all"];

    if (!validIntervals.includes(timeInterval)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid timeInterval" });
    }

    const userEmail = req.user!.email;

    const [totalSold, totalPurchased] = await Promise.all([
      invoiceService.getSalesData(userEmail, timeInterval),
      productService.getPurchasedData?.(userEmail, timeInterval) ?? 0,
    ]);

    res.status(200).json({
      success: true,
      data: { totalSold, totalPurchased },
    });
  },
};
