import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// In development, uses localhost:5000.
// In production, set NEXT_PUBLIC_API_URL in your Vercel env vars to your backend URL.
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl.replace(/\/+$/, ""),
  }),
  tagTypes: ["Invoice", "Product", "Dashboard"],
  endpoints: () => ({}),
});
