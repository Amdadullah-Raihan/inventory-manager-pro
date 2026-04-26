const useApiUrl = () => {
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://inventory-management-server-cx01ppgc0.vercel.app";

  return [apiUrl];
};

export default useApiUrl;
