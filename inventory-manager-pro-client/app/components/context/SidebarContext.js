'use client'
import React, { createContext, useContext, useState } from 'react'


const SidebarContext = createContext();


const useSidebar = () => {
    const [isCollapsed, setCollapsed] = useState(false);

    return {
        isCollapsed,
        setCollapsed
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