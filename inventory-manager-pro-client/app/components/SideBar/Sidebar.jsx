'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineHome } from 'react-icons/ai';
import { FaFileInvoice, FaFileMedical } from 'react-icons/fa';
import { TbShoppingBag, TbShoppingBagPlus } from 'react-icons/tb';


import logo from '../../assests/logo/cn-computer-logo.jpg';
import { usePathname, useRouter } from 'next/navigation';
import { useSidebarContext } from '@/app/context/SidebarContext';

const Sidebar = () => {
    const { isCollapsed } = useSidebarContext();
    const pathname = usePathname();


    // A helper function to create menu items with a consistent structure
    function createMenuItem(isCollapsed, href, label, icon) {
        const isActive = pathname === href;
        console.log('href', href, "pathname", pathname, 'isActive', isActive);
        return (
            <p className={`mb-3  hover:bg-neutral p-2 hover:rounded-lg hover:text-white ${isActive && 'bg-primary rounded-lg text-white'}`}>
                <Link href={href} className="flex gap-3 items-center">
                    {icon} {label}
                </Link>
            </p>
        );
    }

    return (
        <div >
            <Link href="/">
                <div className="w-full  items-center py-2 flex gap-x-2 uppercase border-b border-gray-500 mb-6">
                    <Image src={logo} alt="" className="max-w-[50px] rounded-full" />
                    <p className='text-[18px] font-bold text-white'>  CN Computer & Networks</p>
                </div>
            </Link>

            <div className='text-[16px] '>
                {createMenuItem(isCollapsed, '/', 'Dashboard', <AiOutlineHome className="text-lg font-bold" />)}

                {createMenuItem(isCollapsed, '/pages/products', 'Products', <TbShoppingBag className="text-xl" />)}

                {createMenuItem(isCollapsed, '/pages/products/new', 'Add Product', <TbShoppingBagPlus className="text-xl" />)}

                {createMenuItem(isCollapsed, '/pages/invoice', 'Invoices', <FaFileInvoice className="text-xl" />)}

                {createMenuItem(isCollapsed, '/pages/invoice/new', 'Create Invoice', <FaFileMedical className="text-xl" />)}
            </div>

        </div>
    );
};



export default Sidebar;
