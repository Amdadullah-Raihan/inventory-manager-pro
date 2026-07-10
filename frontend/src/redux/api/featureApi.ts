import { baseApi } from "./baseApi";

export const featureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get sales data for dashboard
    getSalesData: builder.query({
      query: ({
        userEmail,
        timeInterval,
      }: {
        userEmail: string;
        timeInterval: string;
      }) => `/api/features/sales/${userEmail}/${timeInterval}`,
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetSalesDataQuery } = featureApi;
