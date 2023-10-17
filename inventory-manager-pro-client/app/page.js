'use client'

import Image from 'next/image'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/SideBar/Sidebar'
import HomePage from './components/Home/HomePage'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter();
  return (
    <ProtectedRoute router={router}>
      <HomePage />
    </ProtectedRoute>
  )
}
