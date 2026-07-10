import { z } from "zod";

// ---- Product Validation ----
export const purchasedFromSchema = z.object({
  shopName: z.string().min(1, "Shop name is required"),
  shopNumber: z.string().min(1, "Shop number is required"),
  shopAddress: z.string().min(1, "Shop address is required"),
  purchasingPrice: z.number().min(0, "Purchasing price must be >= 0"),
  sellingPrice: z.number().min(0, "Selling price must be >= 0"),
  purchasingDate: z.string().or(z.date()),
});

export const createProductSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  barCode: z.string().min(1, "Barcode is required"),
  brand: z.string().min(1, "Brand is required"),
  purchasedFrom: purchasedFromSchema,
  stock: z.number().int().min(0, "Stock must be >= 0"),
  warranty: z.string().min(1, "Warranty is required"),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

// ---- Invoice Validation ----
export const customerDetailsSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  customerAddress: z.string().min(1, "Customer address is required"),
  customerPhoneNo: z.string().min(1, "Phone number is required"),
  customerEmail: z.string().email().optional().or(z.literal("")),
});

export const productItemSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  warranty: z.string(),
  quantity: z.number().min(0),
  unitPrice: z.number().min(0),
});

export const paymentDetailsSchema = z.object({
  subtotal: z.number().min(0),
  discount: z.number().min(0),
  total: z.number().min(0),
  totalPaid: z.number().min(0),
  totalDue: z.number().min(0),
});

export const createInvoiceSchema = z.object({
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  issuedDate: z.string().or(z.date()),
  customerDetails: customerDetailsSchema,
  productDetails: z.object({
    products: z
      .array(productItemSchema)
      .min(1, "At least one product is required"),
  }),
  paymentDetails: paymentDetailsSchema,
});

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;

// ---- Pagination ----
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  sort: z.string().optional(),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
