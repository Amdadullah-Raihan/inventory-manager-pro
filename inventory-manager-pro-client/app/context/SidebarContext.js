import React, { createContext, useContext, useEffect, useState } from 'react';

const SidebarContext = createContext();

const useSidebar = () => {
    const [isCollapsed, setCollapsed] = useState(false);
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    const handleResize = () => {
        const newWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
        setWidth(newWidth);
        setCollapsed(newWidth < 576);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            handleResize(); // Initialize based on the current width
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
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
