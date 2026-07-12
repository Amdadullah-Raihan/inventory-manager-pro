const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const catchAsync = require("../utils/catchAsync");
const ctrl = require("../controllers/invoiceController");

router.use(authMiddleware);

router.get("/latest/invoiceNumber", catchAsync(ctrl.getLatestInvoiceNumber));
router.get("/singleInvoice/:id", catchAsync(ctrl.getById));
router.get("/", catchAsync(ctrl.getAll));
router.post("/new", catchAsync(ctrl.create));
router.delete("/delete/many", catchAsync(ctrl.deleteMany));
router.delete("/:id", catchAsync(ctrl.deleteOne));

module.exports = router;
