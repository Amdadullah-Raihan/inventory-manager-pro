import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://inventory-management-server-cx01ppgc0.vercel.app");

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl.replace(/\/+$/, ""),
  }),
  tagTypes: ["Invoice", "Product", "Dashboard"],
  endpoints: () => ({}),
});
