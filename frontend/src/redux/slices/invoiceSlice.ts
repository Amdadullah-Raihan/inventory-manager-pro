import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Product {
  productName: string;
  warranty: string;
  quantity: number;
  unitPrice: number;
}

interface CustomerDetails {
  customerName: string;
  customerAddress: string;
  customerPhoneNo: string;
  customerEmail: string;
}

interface PaymentDetails {
  subtotal: number;
  discount: number;
  total: number;
  totalPaid: number;
  totalDue: number;
}

interface InvoiceState {
  userEmail: string;
  invoiceNumber: string;
  issuedDate: string;
  customerDetails: CustomerDetails;
  productDetails: {
    products: Product[];
  };
  paymentDetails: PaymentDetails;
}

const issuedDate = new Date().toISOString().split("T")[0];

const initialState: InvoiceState = {
  userEmail: "",
  invoiceNumber: "",
  issuedDate,
  customerDetails: {
    customerName: "",
    customerAddress: "",
    customerPhoneNo: "",
    customerEmail: "",
  },
  productDetails: {
    products: [{ productName: "", warranty: "", quantity: 0, unitPrice: 0 }],
  },
  paymentDetails: {
    subtotal: 0,
    discount: 0,
    total: 0,
    totalPaid: 0,
    totalDue: 0,
  },
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setInvoice: (_state, action: PayloadAction<InvoiceState>) => {
      return action.payload;
    },
    updateInvoice: (state, action: PayloadAction<Partial<InvoiceState>>) => {
      return { ...state, ...action.payload };
    },
    resetInvoice: () => initialState,
  },
});

export const { setInvoice, updateInvoice, resetInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
