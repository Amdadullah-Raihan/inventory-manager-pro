"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCollapsed, setWidth } from "@/redux/slices/sidebarSlice";
import { setDarkMode } from "@/redux/slices/darkModeSlice";
import { fetchCurrentUser } from "@/redux/slices/authSlice";

/** Syncs Redux sidebar state with window resize events */
export function useSidebarResize() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      dispatch(setWidth(w));
      dispatch(setCollapsed(w < 576));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);
}

/** Syncs Redux dark mode state with localStorage and <html> class */
export function useDarkModeEffect() {
  const isDark = useAppSelector((s) => s.darkMode.isDark);
  const dispatch = useAppDispatch();

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("isDark");
    if (saved) dispatch(setDarkMode(saved));
  }, [dispatch]);

  // Sync to localStorage and <html> class
  useEffect(() => {
    localStorage.setItem("isDark", isDark);
    if (isDark === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);
}

/** Initializes JWT auth state by checking localStorage for an existing token */
export function useAuthInit() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchCurrentUser());
    } else {
      dispatch({ type: "auth/setLoading", payload: false });
    }
  }, [dispatch]);
}
