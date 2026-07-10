"use client";

import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext<{
  isDark: string;
  setIsDark: (v: string) => void;
}>({ isDark: "", setIsDark: () => {} });

export function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("isDark");
    if (saved) setIsDark(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("isDark", isDark);
    if (isDark === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <DarkModeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkMode = () => useContext(DarkModeContext);
