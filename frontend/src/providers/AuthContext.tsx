"use client";
import useFirebase from "@/hooks/useFirebase";
import React, { createContext, useContext } from "react";
const AuthContext = createContext<ReturnType<typeof useFirebase>>(
  {} as ReturnType<typeof useFirebase>,
);

export const AuthContextProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={useFirebase()}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
