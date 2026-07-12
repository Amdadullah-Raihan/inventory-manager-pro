const express = require("express");
const Product = require("../models/products");
const authMiddleware = require("../utils/authMiddleware");
const router = express.Router();

// All product routes require authentication
router.use(authMiddleware);

// Get all products for current user => /api/products?partialQuery=...
router.get("/", async (req, res) => {
  const userEmail = req.user.email;
  const partialQuery = req.query.partialQuery;

  try {
    const query = { user: userEmail };

    if (partialQuery) {
      const escaped = partialQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      query.$or = [
        { barCode: { $regex: escaped, $options: "i" } },
        { productName: { $regex: escaped, $options: "i" } },
        { "purchasedFrom.shopName": { $regex: escaped, $options: "i" } },
        { "purchasedFrom.shopNumber": { $regex: escaped, $options: "i" } },
        { "purchasedFrom.shopAddress": { $regex: escaped, $options: "i" } },
      ];
    }

    const products = await Product.find(query);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// Create a new product => /api/products/new
router.post("/new", async (req, res) => {
  try {
    const product = new Product({
      user: req.user.email,
      productName: req.body.productName,
      barCode: req.body.barCode,
      brand: req.body.brand,
      purchasedFrom: {
        shopName: req.body.purchasedFrom.shopName,
        shopNumber: req.body.purchasedFrom.shopNumber,
        shopAddress: req.body.purchasedFrom.shopAddress,
        purchasingPrice: req.body.purchasedFrom.purchasingPrice,
        sellingPrice: req.body.purchasedFrom.sellingPrice,
        purchasingDate: req.body.purchasedFrom.purchasingDate,
      },
      stock: req.body.stock,
      warranty: req.body.warranty,
    });
    const result = await product.save();
    res.json({
      success: true,
      result: result,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

//get a product by id => /api/products/:id
router.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      product: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

//update a product by id => /api/products/:id
router.put("/update/:id", async (req, res) => {
  console.log("api hitted");
  let productId = req.params.id;
  const updatedProductData = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true },
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// delete a product by id => /api/products/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      deletedProduct: deletedProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Delete products by IDs => /api/products/delete
router.delete("/delete/many", async (req, res) => {
  const productIds = req.body.ids; // Assuming the IDs are in the request body

  try {
    if (!Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid or empty array of product IDs provided",
      });
    }

    // Use the deleteMany method to remove products by their IDs
    const deletedProducts = await Product.deleteMany({
      _id: { $in: productIds },
    });

    if (deletedProducts.deletedCount === 0) {
      // If no products were deleted
      return res.status(404).json({
        success: false,
        error: "No products found for the provided IDs",
      });
    }

    // If products were successfully deleted
    res.status(200).json({
      success: true,
      message: "Products deleted successfully",
    });
  } catch (err) {
    // Handle errors, e.g., database errors
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;
