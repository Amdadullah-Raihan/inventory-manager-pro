import { useState, useEffect } from 'react';
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import initializeAuthentication from '@/public/firebase/firebase.init';

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Initialize authentication
    initializeAuthentication();
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();

    // Handle Google sign-in
    const handleGoogleSignIn = () => {
        return signInWithPopup(auth, googleProvider);
    };

    // Handle log out
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUser({});
                router.push('/');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    // Remember the user state
    useEffect(() => {
        setIsLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user) setUser(user);
            else setUser({});
            setIsLoading(false)
        });
    }, [user, auth]);

    return {
        user,
        setUser,
        error,
        handleGoogleSignIn,
        handleSignOut,
        isLoading
    };
};

export default useFirebase;
