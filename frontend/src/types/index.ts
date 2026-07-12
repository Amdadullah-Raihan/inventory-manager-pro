// Shared types for the application

export interface User {
  id?: string;
  email?: string;
  name?: string;
  [key: string]: unknown;
}

export interface InvoiceProduct {
  product: string;
  productId: string;
  quantity: number;
  price: number;
  total: number;
  idx?: number;
}

export interface Invoice {
  _id?: string;
  invoiceNo?: string;
  invoiceDate?: string;
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  products?: InvoiceProduct[];
  note?: string;
  subTotal?: number;
  tax?: number;
  total?: number;
  paid?: number;
  due?: number;
  [key: string]: unknown;
}

export interface TimeInterval {
  value: string;
  label: string;
}
}
