'use client'
import React, { createContext, useContext, useState } from 'react'


const SidebarContext = createContext();


const useSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return {
        isCollapsed,
        setIsCollapsed
    }
}

const SidebarContextProvider = ({ children }) => {

    return (
        <SidebarContext.Provider value={useSidebar()}>
            {children}
        </SidebarContext.Provider>
    )
}

export default SidebarContextProvider;

export const useSidebarContext = () => {
    return useContext(SidebarContext)
}