import { baseApi } from "./baseApi";

export interface ProductListItem {
  _id: string;
  productName: string;
  barCode: string;
  stock: string | number;
  warranty: string;
  purchasedFrom: {
    shopName: string;
    shopNumber: string;
    shopAddress: string;
    purchasingPrice: number;
    sellingPrice: number;
  };
}

export interface ProductDetail extends ProductListItem {
  barCode: string;
  brand: string;
  user: string;
  purchasedFrom: ProductListItem["purchasedFrom"] & {
    purchasingDate: string;
  };
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products for the current user (with optional search)
    getProducts: builder.query<ProductListItem[], { partialQuery?: string }>({
      query: ({ partialQuery } = {}) => {
        const queryStr = partialQuery
          ? `?partialQuery=${encodeURIComponent(partialQuery)}`
          : "";
        return `/api/products${queryStr}`;
      },
      providesTags: ["Product"],
      transformResponse: (response: {
        success: boolean;
        products: ProductListItem[];
      }) => response.products,
    }),

    // Get a single product by ID
    getSingleProduct: builder.query<ProductDetail, string>({
      query: (productId: string) => `/api/products/product/${productId}`,
      providesTags: (_result, _error, productId) => [
        { type: "Product", id: productId },
      ],
      transformResponse: (response: {
        success: boolean;
        product: ProductDetail;
      }) => response.product,
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
    updateProduct: builder.mutation<
      { success: boolean; product: ProductDetail },
      {
        productId: string;
        product: ProductDetail;
      }
    >({
      query: ({ productId, product }) => ({
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
