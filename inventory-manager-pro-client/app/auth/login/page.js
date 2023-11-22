"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/app/context/AuthContext";
import useFirebase from "@/app/hooks/useFirebase";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const { handleGoogleSignIn, setUser, user, handleEmailSignIn, error } =
    useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isHidden, setIsHidden] = useState(true);
  const router = useRouter();
  const path = usePathname();

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

  // Reference Function to handle login with email and password
  const handleSignIn = (e) => {
    e.preventDefault();
    handleEmailSignIn(email, password);
  };
  // console.log(error);
  // if (error.length > 0) {
  //   toastr.error(error);
  // }

  // Check if the user is already logged in, and if so, redirect to the home page
  useEffect(() => {
    if (user?.email) {
      router.push("/");
    }
  }, [router, user]);

  console.log(path);

  return (
    <div className="bg-[#F7F7F9] dark:bg-secondary w-full h-[100vh] p-4 ">
      <div className="bg-white dark:bg-neutral dark:border-none w-full max-w-[400px] border shadow  p-3 flex flex-col   rounded-lg mx-auto">
        <form className=" w-full flex flex-col gap-y-3" onSubmit={handleSignIn}>
          <div className="w-full text-start mb-4 ">
            <h1 className="dark:text-white text-xl text-gray-700">
              Welcome to Inventory Manager Pro!!
            </h1>
            <p className="text-xs text-gray-500">
              Please login to your account and start the adventure
            </p>
          </div>

          <div className="">
            <label className="text-sm text-gray-500 ">Email</label>
            <input
              type="email"
              name=""
              onChange={(e) => setEmail(e.target.value)}
              className="w-full dark:text-gray-400  input input-bordered dark:bg-secondary"
              placeholder="Write Your Email"
              required
            />
          </div>
          <div className="relative">
            <label className="text-sm text-gray-500 ">Password</label>
            <input
              type={isHidden ? "password" : "text"}
              name=""
              onChange={(e) => setPassword(e.target.value)}
              className="w-full dark:text-gray-400 input input-bordered dark:bg-secondary"
              placeholder="Enter Your Password"
              required
            />

            <button
              type="button"
              className="absolute top-[54%] right-2 dark:text-accent"
              onClick={() => setIsHidden(!isHidden)}
            >
              {!isHidden ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <div className="flex gap-4 my-3">
            <p className="text-gray-500">Don&apos;t have an account? </p>
            <Link href="/auth/register" className="text-primary">
              Create a New Account
            </Link>
          </div>
          <button
            type="submit"
            className="btn btn-primary  border-none hover:bg-secondary "
          >
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
      <ToastContainer />
    </div>
  );
};

export default Login;
