"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { AuthContextProvider } from "@/providers/AuthContext";
import { DarkModeProvider } from "@/providers/DarkModeContext";
import { InvoiceContextProvider } from "@/providers/InvoiceContext";
import SidebarContextProvider from "@/providers/SidebarContext";
import { TimeIntervalContextProvider } from "@/providers/TimeIntervalContext";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <DarkModeProvider>
        <AuthContextProvider>
          <SidebarContextProvider>
            <TimeIntervalContextProvider>
              <InvoiceContextProvider>{children}</InvoiceContextProvider>
            </TimeIntervalContextProvider>
          </SidebarContextProvider>
        </AuthContextProvider>
      </DarkModeProvider>
    </Provider>
  );
}
