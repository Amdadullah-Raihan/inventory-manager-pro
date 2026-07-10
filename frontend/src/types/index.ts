// ---- Product Types ----
export interface PurchasedFrom {
  shopName: string;
  shopNumber: string;
  shopAddress: string;
  purchasingPrice: number;
  sellingPrice: number;
  purchasingDate: string;
}

export interface Product {
  _id: string;
  user: string;
  productName: string;
  barCode: string;
  brand: string;
  purchasedFrom: PurchasedFrom;
  stock: number;
  warranty: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductListResponse {
  success: boolean;
  data: Product[];
  pagination: PaginationMeta;
}

// ---- Invoice Types ----
export interface CustomerDetails {
  customerName: string;
  customerAddress: string;
  customerPhoneNo: string;
  customerEmail?: string;
}

export interface ProductItem {
  productName: string;
  warranty: string;
  quantity: number;
  unitPrice: number;
}

export interface PaymentDetails {
  subtotal: number;
  discount: number;
  total: number;
  totalPaid: number;
  totalDue: number;
}

export interface Invoice {
  _id: string;
  userEmail: string;
  invoiceNumber: string;
  issuedDate: string;
  customerDetails: CustomerDetails;
  productDetails: {
    products: ProductItem[];
  };
  paymentDetails: PaymentDetails;
}

export interface InvoiceListResponse {
  success: boolean;
  data: Invoice[];
  pagination: PaginationMeta;
}

// ---- Common ----
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}

export interface SalesData {
  success: boolean;
  data: {
    totalSold: number;
    totalPurchased: number;
  };
}
