const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const catchAsync = require("../utils/catchAsync");
const ctrl = require("../controllers/userController");

// Public routes
router.post("/send-otp", catchAsync(ctrl.sendOtp));
router.post("/register", catchAsync(ctrl.register));
router.post("/login", catchAsync(ctrl.login));

// Protected routes
router.get("/me", authMiddleware, catchAsync(ctrl.getMe));
router.put("/change-password", authMiddleware, catchAsync(ctrl.changePassword));

module.exports = router;
