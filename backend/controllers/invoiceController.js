const Invoice = require("../models/invoice");

// GET /api/invoice
exports.getAll = async (req, res) => {
  const userEmail = req.user.email;
  const partialQuery = req.query.partialQuery;

  const query = { userEmail };

  if (partialQuery) {
    const escaped = partialQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    query.$or = [
      { invoiceNumber: { $regex: escaped, $options: "i" } },
      { "customerDetails.customerName": { $regex: escaped, $options: "i" } },
      { "customerDetails.customerEmail": { $regex: escaped, $options: "i" } },
    ];
  }

  const invoices = await Invoice.find(query);

  res.status(200).json({ success: true, invoices });
};

// GET /api/invoice/latest/invoiceNumber
exports.getLatestInvoiceNumber = async (req, res) => {
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
    issuedDate: { $gte: startOfDay, $lt: endOfDay },
  }).select("invoiceNumber");

  const numericParts = invoices
    .map((inv) => {
      const num = parseInt(inv.invoiceNumber.split("-")[2]);
      return isNaN(num) ? 0 : num;
    })
    .filter((n) => n > 0);

  const max = numericParts.length ? Math.max(...numericParts) : 0;
  const greatestInvoiceNumber = max.toString().padStart(3, "0");

  res.status(200).json({ greatestInvoiceNumber });
};

// GET /api/invoice/singleInvoice/:id
exports.getById = async (req, res) => {
  const invoiceId = req.params.id;

  if (!invoiceId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid invoice ID" });
  }

  const invoice = await Invoice.findById(invoiceId);

  if (!invoice) {
    return res.status(404).json({ success: false, error: "Invoice not found" });
  }

  res.status(200).json({ success: true, invoice });
};

// POST /api/invoice/new
exports.create = async (req, res) => {
  const invoice = new Invoice(req.body);
  const result = await invoice.save();

  res.status(201).json({ success: true, result });
};

// DELETE /api/invoice/:id
exports.deleteOne = async (req, res) => {
  const invoice = await Invoice.findByIdAndDelete(req.params.id);

  if (!invoice) {
    return res.status(404).json({ success: false, error: "Invoice not found" });
  }

  res
    .status(200)
    .json({ success: true, message: "Invoice deleted successfully" });
};

// DELETE /api/invoice/delete/many
exports.deleteMany = async (req, res) => {
  const ids = req.body.ids;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid or empty array of IDs" });
  }

  const result = await Invoice.deleteMany({ _id: { $in: ids } });

  if (result.deletedCount === 0) {
    return res.status(404).json({
      success: false,
      error: "No invoices found for the provided IDs",
    });
  }

  res
    .status(200)
    .json({ success: true, message: "Invoices deleted successfully" });
};
