import React, { createContext, useContext, useEffect, useState } from 'react';

const SidebarContext = createContext();

const useSidebar = () => {
    const [isCollapsed, setCollapsed] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    const handleResize = () => {
        const newWidth = window.innerWidth;
        setWidth(newWidth);
        setCollapsed(newWidth < 576);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // Initialize based on the current width

        return () => {
            window.removeEventListener('resize', handleResize);
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
