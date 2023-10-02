
'use client'

//external imports
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    FaCircleUser,
    FaFileInvoice,
    FaGear,
    FaMagnifyingGlass,
    FaMobileScreenButton,
    FaMoon,
    FaPlus,
    FaRightFromBracket,
    FaSun,
    FaSunPlantWilt,
    FaUser
} from 'react-icons/fa6'
import { BsBagCheckFill, BsMoon, BsSearch, BsSun } from 'react-icons/bs'
import { HiOutlineDocument, HiOutlineDocumentPlus } from 'react-icons/hi2'
import { GrSettingsOption } from 'react-icons/gr'
import { TbShoppingBagPlus } from 'react-icons/tb'

//internal imports
import useFirebase from '@/app/hooks/useFirebase'
import { useAuth } from '../context/AuthContext'
import dp from '../../assests/raihan.png'



const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { user, handleSignOut } = useAuth();


    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <Link href='/' className='btn bg-[#5a66f1] text-white text-xl font-bold '><span className=''>CN</span> <span className='hidden lg:block'>Computer</span></Link>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end mr-4 flex items-center">

                        <Link href='/pages/invoice/preview' >
                            <label tabIndex={0} className="btn btn-ghost btn-circle" onClick={() => { }} title='Create Invoice'>
                                <FaFileInvoice className='text-2xl text-[#5a66f1]' />
                            </label>
                        </Link>
                        <Link href='/pages/invoice/new' >
                            <label tabIndex={0} className="btn btn-ghost btn-circle" onClick={() => { }} title='Create Invoice'>
                                <HiOutlineDocumentPlus className='text-2xl text-[#5a66f1]' />
                            </label>
                        </Link>
                        <Link href='/pages/products'>
                            <label tabIndex={0} className="btn btn-ghost btn-circle" onClick={() => { }} title='See All Products'>
                                <BsBagCheckFill className='text-xl text-[#5a66f1]' />
                            </label>
                        </Link>
                        <Link href='/pages/products/new'>
                            <label tabIndex={0} className="btn btn-ghost btn-circle" onClick={() => { }} title='Add Product'>

                                <TbShoppingBagPlus className='text-2xl text-[#5a66f1]' />

                            </label>
                        </Link>

                        <label tabIndex={0} className="btn btn-ghost btn-circle" onClick={() => setIsDarkMode(!isDarkMode)}>
                            {
                                !isDarkMode ?
                                    <BsSun className='text-2xl text-[#5a66f1]' /> :

                                    <BsMoon className='text-2xl text-[#5a66f1]' />
                            }
                        </label>
                        <label tabIndex={0} className=" bg-[#5A66F1] mr-4 rounded-md hidden lg:block" onClick={() => { }}>
                            <input type="text" className='bg-[#c5c9f2] rounded-s-md h-8' />
                            <button className='px-2 text-white'>
                                <BsSearch className='' />
                            </button>
                        </label>


                    </div>

                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2">

                            {
                                !user?.email ? <FaUser className='text-gray-500 text-2xl rounded-full' /> :
                                    <Image src={user?.photoURL} alt='DP' width={100} height={100} className='rounded-full' />
                            }

                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-[250px]">
                            <li>
                                <a className="justify-between">
                                    <p className='flex items-center gap-2'>
                                        <FaCircleUser className='text-[#5a66f1]' />
                                        Profile
                                    </p>
                                    <span className="badge text-[#5a66f1]">New</span>
                                </a>
                            </li>
                            <li><a><FaGear className='text-[#5a66f1]' />Settings</a></li>
                            {
                                !user?.email ? <li><a><FaRightFromBracket className={` text-gray-700`} />Logout</a></li> :
                                    <li onClick={handleSignOut}><a><FaRightFromBracket className={`${!user?.email && 'disable'} text-[#5a66f1]`} />Logout</a></li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar