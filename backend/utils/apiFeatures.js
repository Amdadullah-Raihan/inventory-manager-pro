const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const catchAsync = require("../middlewares/catchAsync");
const ctrl = require("../controllers/featureController");

router.use(authMiddleware);

router.get("/sales/:timeInterval", catchAsync(ctrl.getSalesData));

module.exports = router;
