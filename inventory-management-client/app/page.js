'use client'

import Image from 'next/image'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/SideBar/Sidebar'
import HomePage from './components/Home/HomePage'
import IndexPage from './pages/page'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter();
  return (
    <div className='bg-[#F7F7F9] min-h-[100vh]  '>

      <ProtectedRoute router={router}>
        <IndexPage />
      </ProtectedRoute>

    </div>
  )
}
