import Invoice from "../models/invoice";
import type {
  CreateInvoiceInput,
  PaginationInput,
} from "../validators/schemas";

export const invoiceService = {
  async getLatestInvoiceNumber(userEmail: string) {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
    );

    const invoices = await Invoice.find({
      userEmail,
      issuedDate: { $gte: startOfDay, $lt: endOfDay },
    }).select("invoiceNumber");

    const numericParts = invoices
      .map((inv) => {
        const parts = inv.invoiceNumber.split("-");
        return parseInt(parts[2]);
      })
      .filter((n) => !isNaN(n) && n > 0);

    return numericParts.length
      ? Math.max(...numericParts)
          .toString()
          .padStart(3, "0")
      : "000";
  },

  async list(userEmail: string, params: PaginationInput) {
    const { page, limit, search, sort = "-issuedDate" } = params;
    const query: Record<string, unknown> = { userEmail };

    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      query.$or = [
        { invoiceNumber: { $regex: escaped, $options: "i" } },
        { "customerDetails.customerName": { $regex: escaped, $options: "i" } },
        { "customerDetails.customerEmail": { $regex: escaped, $options: "i" } },
      ];
    }

    const [invoices, total] = await Promise.all([
      Invoice.find(query)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Invoice.countDocuments(query),
    ]);

    return { invoices, total, page, limit };
  },

  async getById(userEmail: string, id: string) {
    return Invoice.findOne({ _id: id, userEmail });
  },

  async create(userEmail: string, data: CreateInvoiceInput) {
    const invoice = new Invoice({ ...data, userEmail });
    return invoice.save();
  },

  async delete(userEmail: string, id: string) {
    return Invoice.findOneAndDelete({ _id: id, userEmail });
  },

  async deleteMany(userEmail: string, ids: string[]) {
    return Invoice.deleteMany({ _id: { $in: ids }, userEmail });
  },

  async getSalesData(userEmail: string, timeInterval: string) {
    const today = new Date();
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
    );
    let fromDate: Date;

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
      timeInterval !== "all"
        ? { issuedDate: { $gte: fromDate, $lt: endOfDay } }
        : {};

    const invoices = await Invoice.find({ userEmail, ...dateFilter })
      .select("paymentDetails.total")
      .lean();

    return invoices.reduce(
      (sum, inv) => sum + (inv.paymentDetails?.total || 0),
      0,
    );
  },
};
