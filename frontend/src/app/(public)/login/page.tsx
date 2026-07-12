"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Toaster, toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser, setToken, clearError } from "@/redux/slices/authSlice";
import { useLoginMutation } from "@/redux/api/authApi";

const Login = () => {
  const { user, error } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isHidden, setIsHidden] = useState(true);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      localStorage.setItem("token", result.token);
      dispatch(setUser(result.user as unknown as Record<string, unknown>));
      dispatch(setToken(result.token));
      toast.success("Logged in successfully");
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "data" in err
          ? (err as { data: { message?: string } }).data?.message
          : "Login failed";
      toast.error(message || "Login failed");
    }
  };

  // Show error toast from slice
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Redirect if already logged in
  useEffect(() => {
    if (user?.email) {
      router.push("/");
    }
  }, [router, user]);

  return (
    <div className="bg-[#F7F7F9] dark:bg-secondary w-full h-[100vh] p-4 ">
      <div className="bg-white dark:bg-neutral dark:border-none w-full max-w-[400px] border shadow  p-3 flex flex-col   rounded-lg mx-auto">
        <form className="flex flex-col w-full  gap-y-3" onSubmit={handleSignIn}>
          <div className="w-full mb-4 text-start ">
            <h1 className="text-xl text-gray-700 dark:text-white">
              Welcome to Invoice Maker!!
            </h1>
            <p className="text-xs text-gray-500">
              Please login to your account and start the adventure
            </p>
          </div>

          <div className="">
            <label className="text-sm text-gray-500 ">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full dark:text-gray-400 input input-bordered dark:bg-secondary"
              placeholder="Write Your Email"
              required
            />
          </div>
          <div className="relative">
            <label className="text-sm text-gray-500 ">Password</label>
            <input
              type={isHidden ? "password" : "text"}
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
            <Link href="/register" className="text-primary">
              Create a New Account
            </Link>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="border-none btn btn-primary hover:bg-secondary "
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
