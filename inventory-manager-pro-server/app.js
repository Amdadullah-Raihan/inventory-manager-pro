//external imports
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });

//internal imports
const products = require("./routes/products");
const user = require("./routes/users");
const invoice = require("./routes/invoice");
const apiFeatures = require("./utils/apiFeatures");

//variable declarations
const port = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://inventory-manager-pro.vercel.app",
];

if (process.env.CLIENT_ORIGIN) {
  process.env.CLIENT_ORIGIN.split(",").forEach((origin) => {
    const trimmed = origin.trim();
    if (trimmed && !allowedOrigins.includes(trimmed)) {
      allowedOrigins.push(trimmed);
    }
  });
}

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
};

// deafult middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

//database connection
const dbUrl = process.env.DB_ATLAS;

console.log("Connecting to MongoDB Atlas...");

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Database connection established...");
  })
  .catch((err) => {
    console.log("Error connecting to Database... " + err);
  });

//routes handlers middlewares
app.use("/api/products", products);
app.use("/api/user", user);
app.use("/api/invoice", invoice);
app.use("/api/features", apiFeatures);

//main route
app.get("/", (req, res) => {
  res.send("Welcome to Inventory Management App Server!");
});

//listen to port:5000
if (process.env.VERCEL !== "1") {
  app.listen(port, (req, res) => {
    console.log(`Listening to Inventory Management App Server: port ${port}`);
  });
}

module.exports = app;
