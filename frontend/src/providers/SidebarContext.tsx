"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const SidebarContext = createContext<ReturnType<typeof useSidebar>>(
  {} as ReturnType<typeof useSidebar>,
);

const useSidebar = () => {
  const [isCollapsed, setCollapsed] = useState(false);
  const [width, setWidth] = useState(0);

  const handleResize = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
    setCollapsed(newWidth < 576);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    isCollapsed,
    setCollapsed,
    width,
  };
};

const SidebarContextProvider = ({ children }) => (
  <SidebarContext.Provider value={useSidebar()}>
    {children}
  </SidebarContext.Provider>
);

export default SidebarContextProvider;

export const useSidebarContext = () => useContext(SidebarContext);
