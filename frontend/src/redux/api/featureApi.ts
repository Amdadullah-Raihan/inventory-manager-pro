import { baseApi } from "./baseApi";

export const featureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get sales data for dashboard
    getSalesData: builder.query({
      query: ({ timeInterval }: { timeInterval: string }) =>
        `/api/features/sales/${timeInterval}`,
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetSalesDataQuery } = featureApi;
