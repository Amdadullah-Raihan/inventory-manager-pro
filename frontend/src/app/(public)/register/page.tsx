"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Toaster, toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser, setToken, clearError } from "@/redux/slices/authSlice";
import { setTokenCookie } from "@/utils/cookies";
import { useRegisterMutation } from "@/redux/api/authApi";

const Register = () => {
  const { error } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [validationError, setValidationError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return;
    }

    try {
      const result = await register({ name, email, password }).unwrap();
      localStorage.setItem("token", result.token);
      setTokenCookie(result.token);
      dispatch(setUser(result.user as unknown as Record<string, unknown>));
      dispatch(setToken(result.token));
      toast.success("Account created successfully!");
      router.push("/");
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "data" in err
          ? (err as { data: { message?: string } }).data?.message
          : "Registration failed";
      toast.error(message || "Registration failed");
    }
  };

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <div className="bg-[#F7F7F9] dark:bg-secondary w-full h-[100vh] p-4 ">
      <div className="bg-white dark:bg-neutral dark:border-none w-full max-w-[400px] border shadow  p-3 flex flex-col   rounded-lg mx-auto">
        <form
          className="flex flex-col w-full gap-y-3"
          onSubmit={handleRegister}
        >
          <div className="w-full mb-4 text-start ">
            <h1 className="text-xl text-gray-700 dark:text-white">
              Welcome to Invoice Maker!!
            </h1>
            <p className="text-xs text-gray-500">
              Please create an account and start the adventure
            </p>
          </div>

          <div className="">
            <label className="text-sm text-gray-500 ">Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="w-full dark:text-gray-400 input input-bordered dark:bg-secondary"
              placeholder="Your Full Name"
              required
            />
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
          <div className="">
            <label className="text-sm text-gray-500 ">Confirm Password</label>
            <input
              type={isHidden ? "password" : "text"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full dark:text-gray-400 input input-bordered dark:bg-secondary"
              placeholder="Confirm Your Password"
              required
            />
          </div>

          {validationError && (
            <p className="text-sm text-rose-500">{validationError}</p>
          )}

          <div className="flex gap-4 my-3">
            <p className="text-gray-500">Already have an account? </p>
            <Link href="/login" className="text-primary ">
              Login
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
              "Register"
            )}
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
