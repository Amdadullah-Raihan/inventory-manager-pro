import { baseApi } from "./baseApi";

export interface InvoiceListItem {
  _id: string;
  invoiceNumber: string;
  issuedDate?: string;
  customerDetails: {
    customerName: string;
    customerEmail: string;
  };
}

export interface InvoiceDetail {
  _id?: string;
  invoiceNumber?: string;
  issuedDate?: string;
  customerDetails?: {
    customerName?: string;
    customerAddress?: string;
    customerPhoneNo?: string;
    customerEmail?: string;
  };
  productDetails?: {
    products: Array<{
      productName: string;
      warranty: string;
      quantity: number;
      unitPrice: number;
    }>;
  };
  paymentDetails?: {
    subtotal: number;
    discount: number;
    total: number;
    totalPaid: number;
    totalDue: number;
  };
  [key: string]: unknown;
}

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all invoices for the current user (with optional search)
    getInvoices: builder.query<InvoiceListItem[], { partialQuery?: string }>({
      query: ({ partialQuery } = {}) => {
        const queryStr = partialQuery
          ? `?partialQuery=${encodeURIComponent(partialQuery)}`
          : "";
        return `/api/invoice${queryStr}`;
      },
      providesTags: ["Invoice"],
      transformResponse: (response: {
        success: boolean;
        invoices: InvoiceListItem[];
      }) => response.invoices,
    }),

    // Get a single invoice by ID
    getSingleInvoice: builder.query<InvoiceDetail, string>({
      query: (invoiceId: string) => `/api/invoice/singleInvoice/${invoiceId}`,
      providesTags: (_result, _error, invoiceId) => [
        { type: "Invoice", id: invoiceId },
      ],
      transformResponse: (response: {
        success: boolean;
        invoice: InvoiceDetail;
      }) => response.invoice,
    }),

    // Get the latest invoice number
    getLatestInvoiceNumber: builder.query<
      { greatestInvoiceNumber: string },
      void
    >({
      query: () => "/api/invoice/latest/invoiceNumber",
      providesTags: ["Invoice"],
    }),

    // Create a new invoice
    createInvoice: builder.mutation({
      query: (invoice) => ({
        url: "/api/invoice/new",
        method: "POST",
        body: invoice,
      }),
      invalidatesTags: ["Invoice"],
    }),

    // Delete a single invoice
    deleteInvoice: builder.mutation({
      query: (invoiceId: string) => ({
        url: `/api/invoice/${invoiceId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Invoice"],
    }),

    // Bulk delete invoices
    deleteManyInvoices: builder.mutation({
      query: (ids: string[]) => ({
        url: "/api/invoice/delete/many",
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["Invoice"],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetSingleInvoiceQuery,
  useGetLatestInvoiceNumberQuery,
  useCreateInvoiceMutation,
  useDeleteInvoiceMutation,
  useDeleteManyInvoicesMutation,
} = invoiceApi;
