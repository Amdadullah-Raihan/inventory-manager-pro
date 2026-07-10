import { baseApi } from "./baseApi";

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all invoices for a user (with optional search)
    getInvoices: builder.query({
      query: ({
        userEmail,
        partialQuery,
      }: {
        userEmail: string;
        partialQuery?: string;
      }) => {
        const queryStr = partialQuery
          ? `?partialQuery=${encodeURIComponent(partialQuery)}`
          : "";
        return `/api/invoice/${userEmail}${queryStr}`;
      },
      providesTags: ["Invoice"],
      transformResponse: (response: {
        success: boolean;
        invoices: unknown[];
      }) => response.invoices,
    }),

    // Get a single invoice by ID
    getSingleInvoice: builder.query({
      query: (invoiceId: string) => `/api/invoice/singleInvoice/${invoiceId}`,
      providesTags: (_result, _error, invoiceId) => [
        { type: "Invoice", id: invoiceId },
      ],
      transformResponse: (response: { success: boolean; invoice: unknown }) =>
        response.invoice,
    }),

    // Get the latest invoice number
    getLatestInvoiceNumber: builder.query({
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
