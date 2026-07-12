import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const cookieMatch = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
  return cookieMatch ? cookieMatch[1] : null;
}

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl.replace(/\/+$/, ""),
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Invoice", "Product", "Dashboard", "User"],
  endpoints: () => ({}),
});
