import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import productsRouter from "./routes/products";
import invoiceRouter from "./routes/invoice";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import featuresRouter from "./utils/apiFeatures";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config({ path: __dirname + "/.env" });

const app = express();
const port = process.env.PORT || 5000;
const dbUrl = process.env.DB_ATLAS as string;

const allowedOrigins = [
  "http://localhost:3000",
  "https://invoice-maker.vercel.app",
];

if (process.env.CLIENT_ORIGIN) {
  process.env.CLIENT_ORIGIN.split(",").forEach((origin) => {
    const trimmed = origin.trim();
    if (trimmed && !allowedOrigins.includes(trimmed)) {
      allowedOrigins.push(trimmed);
    }
  });
}

// ---- Security Middleware ----
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

// ---- Global Middleware ----
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);
app.options("*", cors({ origin: allowedOrigins, credentials: true }));

// Database
console.log("Connecting to MongoDB Atlas...");
mongoose
  .connect(dbUrl)
  .then(() => console.log("Database connection established..."))
  .catch((err) => console.error("Database connection error:", err));

// Routes
app.get("/", (_req, res) => {
  res.send("Welcome to Invoice Maker API");
});

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/user", usersRouter);
app.use("/api/features", featuresRouter);

// Error handler (must be last)
app.use(errorHandler);

// Server
if (process.env.VERCEL !== "1") {
  app.listen(port, () => {
    console.log(`Invoice Maker API running on port ${port}`);
  });
}

export default app;
