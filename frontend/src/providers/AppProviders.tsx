"use client";

import { type ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { ReduxProvider } from "./ReduxProvider";
import { ToastContainer } from "react-toastify";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider>
      <AuthProvider>
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </ReduxProvider>
  );
}
