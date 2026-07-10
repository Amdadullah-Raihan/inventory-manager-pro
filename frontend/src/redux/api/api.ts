import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "@/lib/auth/firebase";
import type {
  Product,
  ProductListResponse,
  Invoice,
  InvoiceListResponse,
  SalesData,
  PaginationParams,
} from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://inventory-management-server-cx01ppgc0.vercel.app");

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: async (headers) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Products", "Invoices", "User"],
  endpoints: (builder) => ({
    // ---- Products ----
    getProducts: builder.query<ProductListResponse, PaginationParams>({
      query: (params) => ({
        url: "/api/products",
        params,
      }),
      providesTags: ["Products"],
    }),

    getProduct: builder.query<Product, string>({
      query: (id) => `/api/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Products", id }],
    }),

    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: "/api/products/new",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation<
      Product,
      { id: string; data: Partial<Product> }
    >({
      query: ({ id, data }) => ({
        url: `/api/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Products", id }],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    deleteManyProducts: builder.mutation<void, string[]>({
      query: (ids) => ({
        url: "/api/products/delete/many",
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["Products"],
    }),

    // ---- Invoices ----
    getInvoices: builder.query<InvoiceListResponse, PaginationParams>({
      query: (params) => ({
        url: "/api/invoice/list",
        params,
      }),
      providesTags: ["Invoices"],
    }),

    getInvoice: builder.query<Invoice, string>({
      query: (id) => `/api/invoice/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Invoices", id }],
    }),

    getLatestInvoiceNumber: builder.query<
      { greatestInvoiceNumber: string },
      void
    >({
      query: () => "/api/invoice/latest/invoiceNumber",
    }),

    createInvoice: builder.mutation<Invoice, Partial<Invoice>>({
      query: (body) => ({
        url: "/api/invoice/new",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Invoices"],
    }),

    deleteInvoice: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/invoice/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Invoices"],
    }),

    deleteManyInvoices: builder.mutation<void, string[]>({
      query: (ids) => ({
        url: "/api/invoice/delete/many",
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["Invoices"],
    }),

    // ---- Sales / Dashboard ----
    getSalesData: builder.query<SalesData, string>({
      query: (timeInterval) => `/api/invoice/sales/${timeInterval}`,
    }),

    // ---- User ----
    getCurrentUser: builder.query<
      { uid: string; email: string; name?: string },
      void
    >({
      query: () => "/api/user/me",
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useDeleteManyProductsMutation,
  useGetInvoicesQuery,
  useGetInvoiceQuery,
  useGetLatestInvoiceNumberQuery,
  useCreateInvoiceMutation,
  useDeleteInvoiceMutation,
  useDeleteManyInvoicesMutation,
  useGetSalesDataQuery,
  useGetCurrentUserQuery,
} = api;
