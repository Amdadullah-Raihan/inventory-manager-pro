'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';
import { useSidebarContext } from '../context/SidebarContext';
import { BsBag, BsBagFill, BsBagPlus, BsFillBagPlusFill } from 'react-icons/bs';
import { FaFileInvoice, FaFileMedical, FaRegFile } from 'react-icons/fa6';
import Image from 'next/image';
import logo from '../../assests/logo/cn-computer-logo.jpg'
import { AiOutlineHome } from 'react-icons/ai';
import { TbShoppingBag, TbShoppingBagPlus } from 'react-icons/tb';




const SidebarPro = () => {
    const { isCollapsed, setCollapsed } = useSidebarContext()
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
                    backgroundColor: '#5a66f1',
                    color: 'red',
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

                <MenuItem component={<Link href='/' />}>
                    <p className='flex gap-3 items-center'>
                        <AiOutlineHome className='text-lg font-bold' />
                        <span className={isCollapsed && `hidden`}>Dashboard</span>
                    </p>
                </MenuItem>
                <MenuItem component={<Link href='/pages/products' />}>
                    <p className='flex gap-3 items-center'>
                        <TbShoppingBag className='' />
                        <span className={isCollapsed && `hidden`}>Products</span>
                    </p>
                </MenuItem>
                <MenuItem component={<Link href='/pages/products/new' />}>
                    <p className='flex gap-3 items-center'>
                        <TbShoppingBagPlus className='text-lg' />
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