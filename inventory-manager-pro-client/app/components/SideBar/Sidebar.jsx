'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { AiOutlineHome } from 'react-icons/ai';
import { FaFileInvoice, FaFileMedical } from 'react-icons/fa';
import { TbShoppingBag, TbShoppingBagPlus } from 'react-icons/tb';

import { useSidebarContext } from '../context/SidebarContext';

import logo from '../../assests/logo/cn-computer-logo.jpg';

const SidebarPro = () => {
    const { isCollapsed } = useSidebarContext();

    return (
        <Sidebar
            collapsed={isCollapsed}
            rootStyles={{
                [`.${sidebarClasses.container}`]: {
                    backgroundColor: '#1E293B',
                    color: 'rgb(148, 163, 184)',
                },
            }}
        >
            <Link href="/">
                <div className="w-full justify-center items-center p-4 flex gap-x-2 uppercase border-b border-gray-500 mb-6">
                    <Image src={logo} alt="" className="max-w-[50px] rounded-full" />
                    <p className={isCollapsed ? 'hidden' : 'text-white font-bold'}>CN Computer & Networks</p>
                </div>
            </Link>
            <Menu>
                {createMenuItem(isCollapsed, '/', 'Dashboard', <AiOutlineHome className="text-lg font-bold" />)}

                {createMenuItem(isCollapsed, '/pages/products', 'Products', <TbShoppingBag className="text-xl" />)}

                {createMenuItem(isCollapsed, '/pages/products/new', 'Add Product', <TbShoppingBagPlus className="text-xl" />)}

                {createMenuItem(isCollapsed, '/pages/invoice', 'Invoices', <FaFileInvoice className="text-xl" />)}

                {createMenuItem(isCollapsed, '/pages/invoice/new', 'Create Invoice', <FaFileMedical className="text-xl" />)}
            </Menu>
        </Sidebar>
    );
};

// A helper function to create menu items with a consistent structure
function createMenuItem(isCollapsed, href, label, icon) {
    return (
        <MenuItem component={<Link href={href} />}>
            <p className="flex gap-3 items-center">
                {icon}
                <span className={isCollapsed ? 'hidden' : ''}>{label}</span>
            </p>
        </MenuItem>
    );
}

export default SidebarPro;
