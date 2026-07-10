import { type Request, type Response } from "express";
import { productService } from "../services/productService";
import {
  paginationSchema,
  createProductSchema,
  updateProductSchema,
} from "../validators/schemas";

export const productController = {
  async list(req: Request, res: Response) {
    const params = paginationSchema.parse(req.query);
    const result = await productService.list(req.user!.email, params);

    res.status(200).json({
      success: true,
      data: result.products,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        pages: Math.ceil(result.total / result.limit),
      },
    });
  },

  async create(req: Request, res: Response) {
    const data = createProductSchema.parse(req.body);
    const product = await productService.create(req.user!.email, data);

    res.status(201).json({ success: true, data: product });
  },

  async getById(req: Request, res: Response) {
    const product = await productService.getById(
      req.user!.email,
      req.params.id,
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  },

  async update(req: Request, res: Response) {
    const data = updateProductSchema.parse(req.body);
    const product = await productService.update(
      req.user!.email,
      req.params.id,
      data,
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  },

  async delete(req: Request, res: Response) {
    const product = await productService.delete(req.user!.email, req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted" });
  },

  async deleteMany(req: Request, res: Response) {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No product IDs provided" });
    }

    const result = await productService.deleteMany(req.user!.email, ids);

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} product(s) deleted`,
      deletedCount: result.deletedCount,
    });
  },
};
