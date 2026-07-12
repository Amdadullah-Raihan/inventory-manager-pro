const Product = require("../models/products");

// GET /api/products
exports.getAll = async (req, res) => {
  const userEmail = req.user.email;
  const partialQuery = req.query.partialQuery;

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

  res.status(200).json({ success: true, products });
};

// GET /api/products/product/:id
exports.getById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  res.status(200).json({ success: true, product });
};

// POST /api/products/new
exports.create = async (req, res) => {
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

  res.status(201).json({ success: true, result });
};

// PUT /api/products/update/:id
exports.update = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  res
    .status(200)
    .json({ success: true, message: "Product updated successfully", product });
};

// DELETE /api/products/:id
exports.deleteOne = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    deletedProduct: product,
  });
};

// DELETE /api/products/delete/many
exports.deleteMany = async (req, res) => {
  const ids = req.body.ids;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid or empty array of IDs" });
  }

  const result = await Product.deleteMany({ _id: { $in: ids } });

  if (result.deletedCount === 0) {
    return res.status(404).json({
      success: false,
      error: "No products found for the provided IDs",
    });
  }

  res
    .status(200)
    .json({ success: true, message: "Products deleted successfully" });
};
