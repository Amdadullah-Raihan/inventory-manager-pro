'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaChartColumn, FaFile, FaHouse, FaMoneyCheckDollar, FaProductHunt } from "react-icons/fa6";
import logo from '../../assests/bill.png'
import { BsFillBagCheckFill } from 'react-icons/bs';


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className='flex-grow-2 '>

            <button className={isOpen ? 'hidden' : 'absolute left-4 top-[27px] p-2 bg-[#5A66F1] text-white rounded-full'} onClick={() => setIsOpen(!isOpen)}>
                <FaArrowRight />
            </button>

            <div className={isOpen ? `w-[300px] h-[100vh] bg-[#1E293B]` : `hidden`}>
                <div className='flex justify-between px-4 py-6 border-[#475569] border-b '>
                    <div className='flex items-center' >
                        <div className=''>
                            <div className='flex'>
                                <Image src={logo} alt='Your Logo' className='w-8' />
                                <h3 className='text-white ml-2 uppercase text-2xl'>I.MS</h3>
                            </div>
                            <p className='text-[8px] ml-1 mt-1 text-white'>Inventory Management System</p>
                        </div>
                    </div>
                    {
                        isOpen && <button className=' bg-white p-2 rounded-full ' onClick={() => setIsOpen(!isOpen)}>
                            <FaArrowLeft />
                        </button>
                    }
                </div>
                <p className='text-[#d6d6d6]  pl-4 my-4'>Main</p>

                <div className='pl-6 flex flex-col gap-6'>

                    <div className='flex items-center gap-2 text-[#d6d6d6] hover:text-white'>

                        <FaHouse />
                        <p className=''>
                            Dashboard
                        </p>

                    </div>
                    <div className='flex items-center gap-2 text-[#d6d6d6]  hover:text-white'>
                        <BsFillBagCheckFill />
                        <p className=''>
                            Products
                        </p>
                    </div>
                    <div className='flex items-center gap-2 text-[#d6d6d6]  hover:text-white'>
                        <FaFile />
                        <p className=''>
                            Invoices
                        </p>
                    </div>
                    <div className='flex items-center gap-2 text-[#d6d6d6]  hover:text-white'>
                        <FaChartColumn />
                        <p className=''>
                            Sales Details
                        </p>
                    </div>
                    <div className='flex items-center gap-2 text-[#d6d6d6]  hover:text-white'>
                        <FaMoneyCheckDollar />
                        <p className=''>
                            Purchased Details
                        </p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Sidebar