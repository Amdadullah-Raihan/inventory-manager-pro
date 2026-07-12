const express = require("express");
const router = express.Router();
const authMiddleware = require("./authMiddleware");
const catchAsync = require("./catchAsync");
const ctrl = require("../controllers/featureController");

router.use(authMiddleware);

router.get("/sales/:timeInterval", catchAsync(ctrl.getSalesData));

module.exports = router;
