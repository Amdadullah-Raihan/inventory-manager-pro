import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import initializeAuthentication from "@/public/firebase/firebase.init";

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
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

  // Function to hanlde login with email and password
  const handleEmailSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .then((error) => {
        console.log(error);
      });
  };

  // Function to hanlde update password
  const handleUpdatePassword = (newPassword) => {
    updatePassword(auth.currentUser, newPassword)
      .then((result) => {
        console.log(result);
        alert("Updated password");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle log out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
        router.push("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // Remember the user state
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });

    return () => {
      // Unsubscribe when the component unmounts
      unsubscribe();
    };
  }, []);

  return {
    user,
    setUser,
    error,
    handleGoogleSignIn,
    handleEmailSignIn,
    handleSignOut,
    handleUpdatePassword,
    isLoading,
  };
};

export default useFirebase;
