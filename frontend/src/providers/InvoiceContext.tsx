"use client";

import useInvoice from "@/hooks/useInvoice";
import React, { createContext, useContext } from "react";

const InvoiceContext = createContext<ReturnType<typeof useInvoice>>(
  {} as ReturnType<typeof useInvoice>,
);

export const InvoiceContextProvider = ({ children }) => {
  return (
    <InvoiceContext.Provider value={useInvoice()}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoiceContext = () => {
  return useContext(InvoiceContext);
};
