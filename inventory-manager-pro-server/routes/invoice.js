const express = require("express");
const Invoice = require("../models/invoice");
const router = express.Router();

// IMPORTANT: Static routes MUST be defined before parameterized routes

// Get the latest invoice number => /api/invoice/latest/invoiceNumber
router.get("/latest/invoiceNumber", async (req, res) => {
  try {
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

    // Extract the numeric part of the invoice numbers and convert them to numbers
    const numericParts = invoices.map((invoice) => {
      const parts = invoice.invoiceNumber.split("-");
      const numericPart = parseInt(parts[2]);
      return !isNaN(numericPart) ? numericPart : 0;
    });

    const validNumericParts = numericParts.filter(
      (numericPart) => numericPart > 0,
    );

    if (validNumericParts.length === 0) {
      return res.status(200).json({ greatestInvoiceNumber: "000" });
    }

    const maxNumericPart = Math.max(...validNumericParts);
    const greatestInvoiceNumber = `${maxNumericPart.toString().padStart(3, "0")}`;

    res.status(200).json({ greatestInvoiceNumber });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get an invoice by ID => /api/invoice/singleInvoice/:id
router.get("/singleInvoice/:id", async (req, res) => {
  try {
    const invoiceId = req.params.id;
    if (invoiceId.match(/^[0-9a-fA-F]{24}$/)) {
      // Find the invoice by ID
      const invoice = await Invoice.findById(invoiceId);

      if (!invoice) {
        // If the invoice with the given ID is not found
        return res.status(404).json({
          success: false,
          error: "Invoice not found",
        });
      }

      // If the invoice was successfully found
      res.status(200).json({
        success: true,
        invoice: invoice,
      });
    } else {
      res.status(404).json({
        message: "Object ID is not a valid invoice",
      });
    }
  } catch (err) {
    // Handle errors, e.g., database errors
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// Get invoices for a specific user with optional partial query => /api/invoices/:userEmail?partialQuery=...
router.get("/:userEmail", async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    const partialQuery = req.query.partialQuery;

    if (userEmail && partialQuery) {
      const invoices = await Invoice.find({
        userEmail: userEmail, // Match the specific user's email address
        $or: [
          { invoiceNumber: { $regex: `.*${partialQuery}.*`, $options: "i" } },
          {
            "customerDetails.customerName": {
              $regex: `.*${partialQuery}.*`,
              $options: "i",
            },
          },
          {
            "customerDetails.customerEmail": {
              $regex: `.*${partialQuery}.*`,
              $options: "i",
            },
          },
          // Add more fields here as needed
        ],
      });

      res.status(200).json({
        success: true,
        invoices: invoices,
      });
    } else if (userEmail) {
      // Only userEmail is provided
      const invoices = await Invoice.find({ userEmail: userEmail });

      res.status(200).json({
        success: true,
        invoices: invoices,
      });
    } else {
      res.status(400).json({
        success: false,
        error:
          "User email is missing from the URL or partialQuery is missing from the query parameters.",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// Delete an invoice by ID => /api/invoice/:id
router.delete("/:id", async (req, res) => {
  const invoiceId = req.params.id;

  try {
    // Find the invoice by ID and remove it
    const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);

    if (!deletedInvoice) {
      // If the invoice with the given ID is not found
      return res.status(404).json({
        success: false,
        error: "Invoice not found",
      });
    }

    // If the invoice was successfully deleted
    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
    });
  } catch (err) {
    // Handle errors, e.g., database errors
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// Delete invoices by IDs => /api/invoice/delete
router.delete("/delete/many", async (req, res) => {
  const invoiceIds = req.body.ids;

  try {
    if (!Array.isArray(invoiceIds) || invoiceIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid or empty array of invoice IDs provided",
      });
    }

    // Use the deleteMany method to remove invoices by their IDs
    const deletedInvoices = await Invoice.deleteMany({
      _id: { $in: invoiceIds },
    });

    if (deletedInvoices.deletedCount === 0) {
      // If no invoices were deleted
      return res.status(404).json({
        success: false,
        error: "No invoices found for the provided IDs",
      });
    }

    // If invoices were successfully deleted
    res.status(200).json({
      success: true,
      message: "Invoices deleted successfully",
    });
  } catch (err) {
    // Handle errors, e.g., database errors
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

//create invoice => /api/invoices/new
router.post("/new", async (req, res) => {
  try {
    const product = new Invoice(req.body);

    const result = await product.save();

    res.status(200).json({
      success: true,
      result: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;
