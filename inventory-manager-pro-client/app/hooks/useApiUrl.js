const useApiUrl = () => {
  const rawUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://inventory-management-server-cx01ppgc0.vercel.app");

  const apiUrl = rawUrl.replace(/\/+$/, "");

  return [apiUrl];
};

export default useApiUrl;
