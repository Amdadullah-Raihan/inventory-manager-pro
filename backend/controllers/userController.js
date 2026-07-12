const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const OTP = require("../models/otp");
const { sendOTPEmail } = require("../utils/email");

const JWT_SECRET = process.env.JWT_SECRET || "invoice-maker-jwt-secret";
const OTP_MAX_ATTEMPTS = 3;
const OTP_EXPIRY_MINUTES = 5;

const generateToken = (user) =>
  jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET, {
    expiresIn: "7d",
  });

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// POST /api/user/send-otp
exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  await OTP.deleteMany({ email });

  const code = generateOTP();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  await OTP.create({ email, code, expiresAt });
  await sendOTPEmail(email, code);

  res.json({ message: "OTP sent to your email" });
};

// POST /api/user/register
exports.register = async (req, res) => {
  const { name, email, password, otp } = req.body;

  if (!name || !email || !password || !otp) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  const otpRecord = await OTP.findOne({ email });
  if (!otpRecord) {
    return res
      .status(400)
      .json({ message: "No OTP found. Please request a new one." });
  }

  if (otpRecord.attempts >= OTP_MAX_ATTEMPTS) {
    await OTP.deleteOne({ _id: otpRecord._id });
    return res
      .status(400)
      .json({ message: "Too many attempts. Please request a new OTP." });
  }

  if (otpRecord.code !== otp) {
    otpRecord.attempts += 1;
    await otpRecord.save();
    return res.status(400).json({ message: "Invalid OTP" });
  }

  await OTP.deleteOne({ _id: otpRecord._id });

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashedPassword });

  const token = generateToken(user);

  res.status(201).json({
    token,
    user: { id: user._id, email: user.email, name: user.name },
  });
};

// POST /api/user/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = generateToken(user);

  res.json({
    token,
    user: { id: user._id, email: user.email, name: user.name },
  });
};

// GET /api/user/me
exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ user: { id: user._id, email: user.email, name: user.name } });
};

// PUT /api/user/change-password
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Both passwords are required" });
  }

  if (newPassword.length < 6) {
    return res
      .status(400)
      .json({ message: "New password must be at least 6 characters" });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Current password is incorrect" });
  }

  user.password = await bcrypt.hash(newPassword, 12);
  await user.save();

  res.json({ message: "Password updated successfully" });
};
