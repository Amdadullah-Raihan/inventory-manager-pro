"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import {
  useSidebarResize,
  useDarkModeEffect,
  useAuthInit,
} from "@/hooks/useReduxEffects";

function AppEffects() {
  useAuthInit();
  useSidebarResize();
  useDarkModeEffect();
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AppEffects />
      {children}
    </Provider>
  );
}
