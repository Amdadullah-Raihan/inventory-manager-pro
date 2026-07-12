const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const catchAsync = require("../middlewares/catchAsync");
const ctrl = require("../controllers/productController");

router.use(authMiddleware);

router.get("/", catchAsync(ctrl.getAll));
router.get("/product/:id", catchAsync(ctrl.getById));
router.post("/new", catchAsync(ctrl.create));
router.put("/update/:id", catchAsync(ctrl.update));
router.delete("/delete/many", catchAsync(ctrl.deleteMany));
router.delete("/:id", catchAsync(ctrl.deleteOne));

module.exports = router;
