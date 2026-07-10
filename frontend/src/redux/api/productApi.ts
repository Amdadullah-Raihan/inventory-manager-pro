import { baseApi } from "./baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products for a user (with optional search)
    getProducts: builder.query({
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
        return `/api/products/${userEmail}${queryStr}`;
      },
      providesTags: ["Product"],
      transformResponse: (response: {
        success: boolean;
        products: unknown[];
      }) => response.products,
    }),

    // Get a single product by ID
    getSingleProduct: builder.query({
      query: (productId: string) => `/api/products/product/${productId}`,
      providesTags: (_result, _error, productId) => [
        { type: "Product", id: productId },
      ],
      transformResponse: (response: { success: boolean; product: unknown }) =>
        response.product,
    }),

    // Create a new product
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/api/products/new",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),

    // Update a product
    updateProduct: builder.mutation({
      query: ({
        productId,
        product,
      }: {
        productId: string;
        product: unknown;
      }) => ({
        url: `/api/products/update/${productId}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: (_result, _error, { productId }) => [
        { type: "Product", id: productId },
        "Product",
      ],
    }),

    // Delete a single product
    deleteProduct: builder.mutation({
      query: (productId: string) => ({
        url: `/api/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // Bulk delete products
    deleteManyProducts: builder.mutation({
      query: (ids: string[]) => ({
        url: "/api/products/delete/many",
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useDeleteManyProductsMutation,
} = productApi;
