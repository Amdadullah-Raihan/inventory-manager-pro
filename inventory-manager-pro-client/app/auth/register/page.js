"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/app/context/AuthContext";
import useFirebase from "@/app/hooks/useFirebase";
import Link from "next/link";

const Register = () => {
  const { handleGoogleSignIn, setUser, user } = useAuth();
  const router = useRouter();

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await handleGoogleSignIn();
      setUser(result.user);
      if (result?.user?.email) {
        router.back();
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  // Check if the user is already logged in, and if so, redirect to the home page
  useEffect(() => {
    if (user?.email) {
      router.back();
    }
  }, [user, router]);

  return (
    <div className="bg-[#F7F7F9] dark:bg-secondary w-full h-[100vh] p-4 ">
      <div className="bg-white dark:bg-neutral dark:border-none w-full max-w-[400px] border shadow  p-3 flex flex-col   rounded-lg mx-auto">
        <form className="block w-full flex flex-col gap-y-3">
          <div className="w-full text-start mb-4 ">
            <h1 className="dark:text-white text-xl text-gray-700">
              Welcome to Inventory Manager Pro!!
            </h1>
            <p className="text-xs text-gray-500">
              Please create an account to your account and start the adventure
            </p>
          </div>

          <div className="">
            <label className="text-sm text-gray-500 ">Email</label>
            <input
              type="email"
              name=""
              className="w-full dark:text-gray-400  input input-bordered dark:bg-secondary"
              placeholder="Write Your Email"
            />
          </div>
          <div className="">
            <label className="text-sm text-gray-500 ">Password</label>
            <input
              type="email"
              name=""
              className="w-full dark:text-gray-400 input input-bordered dark:bg-secondary"
              placeholder="Enter Your Password"
            />
            <input
              type="email"
              name=""
              className="w-full dark:text-gray-400 input input-bordered dark:bg-secondary mt-3"
              placeholder="Confirm Your Password "
            />
          </div>
          <div className="flex  gap-4 my-3">
            <p className="text-gray-500">Already have an account? </p>
            <Link href="/auth/login" className="text-primary ">
              Login
            </Link>
          </div>
          <button className="btn btn-primary  border-none hover:bg-secondary ">
            Login
          </button>
        </form>
        <div className="divider dark:text-white">OR</div>
        <button
          className="btn bg-gray-800 border-none text-white hover:bg-gray-900 "
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="text-xl" />
          Log in with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
