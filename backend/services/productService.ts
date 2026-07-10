import Product from "../models/products";
import type {
  CreateProductInput,
  UpdateProductInput,
  PaginationInput,
} from "../validators/schemas";

export const productService = {
  async list(userEmail: string, params: PaginationInput) {
    const { page, limit, search, sort = "-createdAt" } = params;
    const query: Record<string, unknown> = { user: userEmail };

    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      query.$or = [
        { barCode: { $regex: escaped, $options: "i" } },
        { productName: { $regex: escaped, $options: "i" } },
        { "purchasedFrom.shopName": { $regex: escaped, $options: "i" } },
        { "purchasedFrom.shopNumber": { $regex: escaped, $options: "i" } },
      ];
    }

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments(query),
    ]);

    return { products, total, page, limit };
  },

  async create(userEmail: string, data: CreateProductInput) {
    const product = new Product({ ...data, user: userEmail });
    return product.save();
  },

  async getById(userEmail: string, id: string) {
    return Product.findOne({ _id: id, user: userEmail });
  },

  async update(userEmail: string, id: string, data: UpdateProductInput) {
    return Product.findOneAndUpdate({ _id: id, user: userEmail }, data, {
      new: true,
      runValidators: true,
    });
  },

  async delete(userEmail: string, id: string) {
    return Product.findOneAndDelete({ _id: id, user: userEmail });
  },

  async deleteMany(userEmail: string, ids: string[]) {
    return Product.deleteMany({ _id: { $in: ids }, user: userEmail });
  },

  async getPurchasedData(userEmail: string, timeInterval: string) {
    const today = new Date();
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
    );
    let fromDate: Date;

    switch (timeInterval) {
      case "daily":
        fromDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        );
        break;
      case "weekly":
        fromDate = new Date(today);
        fromDate.setDate(fromDate.getDate() - 7);
        break;
      case "monthly":
        fromDate = new Date(today);
        fromDate.setMonth(fromDate.getMonth() - 1);
        break;
      case "yearly":
        fromDate = new Date(today);
        fromDate.setFullYear(fromDate.getFullYear() - 1);
        break;
      default:
        fromDate = new Date(0);
    }

    const dateFilter =
      timeInterval !== "all"
        ? { "purchasedFrom.purchasingDate": { $gte: fromDate, $lt: endOfDay } }
        : {};

    const products = await Product.find({ user: userEmail, ...dateFilter })
      .select("purchasedFrom.purchasingPrice")
      .lean();

    return products.reduce(
      (sum, p) => sum + (p.purchasedFrom?.purchasingPrice || 0),
      0,
    );
  },
};
