import initializeAuthentication, { initializeAuth } from '@/public/firebase/firebase.init'
import React, { useState, useEffect } from 'react'
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation';


initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()


    //handle google signin 
    const handleGoogleSignIn = () => {
        return signInWithPopup(auth, googleProvider);
    };
    //handle log out
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUser({})
                router.push('/')

            }).catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMsg(errorMessage)
                // ..
            });
    }


    //remember the user state
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) setUser(user);
            else setUser({})
        })
    }, [user])


    return {
        user,
        setUser,
        handleGoogleSignIn,
        handleSignOut
    }

}

export default useFirebase