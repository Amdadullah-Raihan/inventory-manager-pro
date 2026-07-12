"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCollapsed, setWidth } from "@/redux/slices/sidebarSlice";
import { setDarkMode } from "@/redux/slices/darkModeSlice";
import { setUser, setToken, setLoading } from "@/redux/slices/authSlice";
import { useGetMeQuery } from "@/redux/api/authApi";

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

/** Hydrates auth state on app init using RTK Query's getMe endpoint */
export function useAuthInit() {
  const dispatch = useAppDispatch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { data, isSuccess, isError, isLoading } = useGetMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data.user as unknown as Record<string, unknown>));
      dispatch(setToken(token!));
      dispatch(setLoading(false));
    }
  }, [isSuccess, data, token, dispatch]);

  useEffect(() => {
    if (isError || !token) {
      dispatch(setLoading(false));
    }
  }, [isError, token, dispatch]);
}
