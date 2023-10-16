
'use client'

//external imports
import React, { useEffect, useState } from 'react'
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
import { useAuth } from '../../context/AuthContext'
import dp from '../../assests/raihan.png'
import { AiOutlineMenu, AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import { useSidebarContext } from '../../context/SidebarContext'
import { useTimeInterval } from '../../context/TimeIntervalContext'
import { usePathname } from 'next/navigation'



const Navbar = () => {
    const { user, handleSignOut } = useAuth();
    const { timeInterval, setTimeInterval } = useTimeInterval();
    const { isCollapsed, setCollapsed, width } = useSidebarContext();
    const pathname = usePathname();


    return (
        <div className="navbar justify-between bg-base-100 shadow-b-md">
            <div className="">
                {
                    isCollapsed ?
                        <button className='' onClick={() => setCollapsed(!isCollapsed)}>
                            <AiOutlineMenuUnfold className='text-2xl mr-2 text-primary' />
                        </button>
                        :
                        <button className='' onClick={() => setCollapsed(!isCollapsed)}>
                            <AiOutlineMenuFold className='text-2xl mr-2 text-primary' />
                        </button>
                }
            </div>


            <div>
                {
                    user.email && pathname === '/' && <div className="dropdown dropdown-end mr-2">
                        <select
                            className="select  select-bordered select-sm w-full  max-w-xs"
                            value={timeInterval}
                            onChange={(e) => setTimeInterval(e.target.value)}>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                            <option disabled value="all">All</option>
                        </select>
                    </div>
                }


                {
                    user.email ? <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full border">
                                <Image src={user.photoURL} alt='DP' width={100} height={100} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li onClick={handleSignOut}><a>Logout</a></li>

                        </ul>
                    </div> :
                        <Link href='/auth/login' className='btn btn-md btn-outline border-[#5a66f1] text-[#5166f1]'>Login</Link>
                }
            </div>


        </div>


    )
}

export default Navbar