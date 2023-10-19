'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineHome } from 'react-icons/ai';
import { FaFileInvoice, FaFileMedical } from 'react-icons/fa';
import { TbShoppingBag, TbShoppingBagPlus } from 'react-icons/tb';
import { usePathname, useRouter } from 'next/navigation';

//internal imports 
import logo from '../../assests/logo/cn-computer-logo.jpg';

const Sidebar = () => {
    const pathname = usePathname();


    // A helper function to create menu items with a consistent structure
    function createMenuItem(href, label, icon) {
        const isActive = pathname === href;
        return (
            <p className={`mb-3  hover:bg-secondary p-2 hover:rounded-lg hover:text-gray-300 ${isActive && 'bg-primary rounded-lg text-white'}`}>
                <Link href={href} className="flex gap-3 items-center">
                    {icon} {label}
                </Link>
            </p>
        );
    }

    return (
        <div >
            <Link href="/">
                <div className="w-full  items-center pb-4 flex gap-x-2 uppercase  border-b dark:border-b-gray-500  border-gray-700 mb-6">
                    <Image src={logo} alt="" className="max-w-[50px] rounded-full" />
                    <p className='text-[18px] font-bold text-white dark:text-gray-300'>  CN Computer & Networks</p>
                </div>

            </Link>

            <div className='text-[16px] '>
                {createMenuItem('/', 'Dashboard', <AiOutlineHome className="text-lg font-bold" />)}

                {createMenuItem('/pages/products', 'Products', <TbShoppingBag className="text-xl" />)}

                {createMenuItem('/pages/products/new', 'Add Product', <TbShoppingBagPlus className="text-xl" />)}

                {createMenuItem('/pages/invoice', 'Invoices', <FaFileInvoice className="text-xl" />)}

                {createMenuItem('/pages/invoice/new', 'Create Invoice', <FaFileMedical className="text-xl" />)}
            </div>

        </div>
    );
};



export default Sidebar;
