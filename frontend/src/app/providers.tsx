"use client";

import { AuthContextProvider } from "@/providers/AuthContext";
import { DarkModeProvider } from "@/providers/DarkModeContext";
import { InvoiceContextProvider } from "@/providers/InvoiceContext";
import SidebarContextProvider from "@/providers/SidebarContext";
import { TimeIntervalContextProvider } from "@/providers/TimeIntervalContext";

export default function Providers({ children }) {
  return (
    <DarkModeProvider>
      <AuthContextProvider>
        <SidebarContextProvider>
          <TimeIntervalContextProvider>
            <InvoiceContextProvider>{children}</InvoiceContextProvider>
          </TimeIntervalContextProvider>
        </SidebarContextProvider>
      </AuthContextProvider>
    </DarkModeProvider>
  );
}
