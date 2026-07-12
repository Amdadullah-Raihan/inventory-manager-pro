import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Set NEXT_PUBLIC_API_URL in .env.local (local dev) or Vercel env vars (production).
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl.replace(/\/+$/, ""),
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Invoice", "Product", "Dashboard", "User"],
  endpoints: () => ({}),
});
