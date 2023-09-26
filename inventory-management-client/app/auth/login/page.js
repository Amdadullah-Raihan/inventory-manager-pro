'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '@/app/components/context/AuthContext';
import useFirebase from '@/app/hooks/useFirebase';

const Login = () => {
    const { handleGoogleSignIn, setUser, user } = useAuth();
    const router = useRouter();

    console.log(router);
    // Function to handle Google login
    const handleGoogleLogin = async () => {

        try {
            const result = await handleGoogleSignIn();
            setUser(result.user);
            if (result?.user?.email) {
                router.back()
            }
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };

    // Check if the user is already logged in, and if so, redirect to the home page
    useEffect(() => {
        if (user?.email) {
            router.back()
        }
    }, [user, router]);

    return (
        <div className='bg-[#F7F7F9] w-full h-[100vh] p-4 flex justify-center'>
            <div className='bg-white w-full max-w-[500px] h-[50%] border shadow p-3 lg:p-6 flex items-center justify-center rounded-lg'>
                <button
                    className='flex items-center justify-center gap-2 h-12 border w-full rounded-full border-[#5A66F1] font-semibold hover:bg-[#5A66F1] hover:text-white transition-colors'
                    onClick={handleGoogleLogin}
                >
                    <FcGoogle className='text-xl' />
                    Log in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
