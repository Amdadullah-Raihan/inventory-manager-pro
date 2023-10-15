'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';
import { useSidebarContext } from '../context/SidebarContext';
import { BsBagFill, BsFillBagPlusFill } from 'react-icons/bs';
import { FaFileInvoice, FaFileMedical } from 'react-icons/fa6';
import Image from 'next/image';
import logo from '../../assests/logo/cn-computer-logo.jpg'




const SidebarPro = () => {
    const { isCollapsed, setIsCollapsed } = useSidebarContext()
    return (
        <Sidebar
            collapsed={isCollapsed}
            breakpoints="sm"
            rootStyles={{
                [`.${sidebarClasses.container}`]: {
                    backgroundColor: '#1E293B',
                    color: 'rgb(148, 163, 184)',
                },
                [`.${sidebarClasses.menuItem}:hover`]: {
                    backgroundColor: '#FF5733',
                    color: '#FFF',
                },
            }}
        >
            <Link href='/'>
                <div className='w-full justify-center  items-center p-4 flex gap-x-2 uppercase border-b border-gray-500 mb-6'>
                    <Image src={logo} alt='' className='max-w-[50px] rounded-full' />
                    <p className={isCollapsed ? 'hidden' : ' text-white font-bold '}>CN Computer & Networks</p>
                </div>
            </Link>
            <Menu>

                <MenuItem component={<Link href='/pages/products' />}>
                    <p className='flex gap-3 items-center'>
                        <BsBagFill className='' />
                        <span className={isCollapsed && `hidden`}>Products</span>
                    </p>
                </MenuItem>
                <MenuItem component={<Link href='/pages/products/new' />}>
                    <p className='flex gap-3 items-center'>
                        <BsFillBagPlusFill className='' />
                        <span className={isCollapsed && `hidden`}>Add Product</span>
                    </p>
                </MenuItem>
                <MenuItem component={<Link href='/pages/invoice' />}>
                    <p className='flex gap-3 items-center'>
                        <FaFileInvoice className='' />
                        <span className={isCollapsed && `hidden`}>Invoices</span>
                    </p>
                </MenuItem>
                <MenuItem component={<Link href='/pages/invoice/new' />}>
                    <p className='flex gap-3 items-center'>
                        <FaFileMedical className='' />
                        <span className={isCollapsed && `hidden`}>Create Invoice</span>
                    </p>
                </MenuItem>

            </Menu>
        </Sidebar>

    )
}

export default SidebarPro;