'use client'
import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/SideBar/Sidebar'
import HomePage from '../components/Home/HomePage'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'
import { useRouter } from 'next/navigation'


const IndexPage = () => {

    return (



        <div className='w-full bg-[#F7F7F9] min-h-[100vh]  '>
            <HomePage />
        </div>



    )
}

export default IndexPage