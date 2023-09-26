
"use client"

import useFirebase from '@/app/hooks/useFirebase'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children, router }) => {
    const { user } = useAuth();

    useEffect(() => {
        if (!user?.email) {
            router.push('/auth/login')
        }
    }, [router, user?.email])
    return children;
}

export default ProtectedRoute