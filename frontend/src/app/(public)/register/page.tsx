"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Toaster, toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser, setToken, clearError } from "@/redux/slices/authSlice";
import { setTokenCookie } from "@/utils/cookies";
import { useSendOtpMutation, useRegisterMutation } from "@/redux/api/authApi";

const Register = () => {
  const { error } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();

  const [step, setStep] = useState<"form" | "otp">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [validationError, setValidationError] = useState("");
  const [otpCooldown, setOtpCooldown] = useState(0);

  // OTP cooldown timer
  useEffect(() => {
    if (otpCooldown <= 0) return;
    const timer = setInterval(() => {
      setOtpCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [otpCooldown]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!name || !email || !password || !confirmPassword) {
      setValidationError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return;
    }

    try {
      await sendOtp({ email }).unwrap();
      toast.success("OTP sent to your email");
      setStep("otp");
      setOtpCooldown(60);
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "data" in err
          ? (err as { data: { message?: string } }).data?.message
          : "Failed to send OTP";
      toast.error(message || "Failed to send OTP");
    }
  };

  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!otp || otp.length !== 6) {
      setValidationError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const result = await register({ name, email, password, otp }).unwrap();
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
      <div className="bg-white dark:bg-neutral dark:border-none w-full max-w-[400px] border shadow p-3 flex flex-col rounded-lg mx-auto">
        {/* Step 1: Fill details & send OTP */}
        {step === "form" && (
          <form
            className="flex flex-col w-full gap-y-3"
            onSubmit={handleSendOtp}
          >
            <div className="w-full mb-4 text-start">
              <h1 className="text-xl text-gray-700 dark:text-white">
                Create an Account
              </h1>
              <p className="text-xs text-gray-500">
                Fill in your details to get started
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-500">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full dark:text-gray-400 input input-bordered dark:bg-secondary"
                placeholder="Your Full Name"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full dark:text-gray-400 input input-bordered dark:bg-secondary"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="relative">
              <label className="text-sm text-gray-500">Password</label>
              <input
                type={isHidden ? "password" : "text"}
                value={password}
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
            <div>
              <label className="text-sm text-gray-500">Confirm Password</label>
              <input
                type={isHidden ? "password" : "text"}
                value={confirmPassword}
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
              <p className="text-gray-500">Already have an account?</p>
              <Link href="/login" className="text-primary">
                Login
              </Link>
            </div>
            <button
              type="submit"
              disabled={isSendingOtp}
              className="border-none btn btn-primary hover:bg-secondary"
            >
              {isSendingOtp ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>
        )}

        {/* Step 2: Enter OTP */}
        {step === "otp" && (
          <form
            className="flex flex-col w-full gap-y-3"
            onSubmit={handleVerifyAndRegister}
          >
            <div className="w-full mb-4 text-start">
              <h1 className="text-xl text-gray-700 dark:text-white">
                Verify Your Email
              </h1>
              <p className="text-xs text-gray-500">
                Enter the 6-digit code sent to{" "}
                <span className="font-semibold">{email}</span>
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-500">OTP Code</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full text-center text-2xl tracking-[0.5em] dark:text-gray-400 input input-bordered dark:bg-secondary"
                placeholder="000000"
                autoFocus
              />
            </div>

            {validationError && (
              <p className="text-sm text-rose-500">{validationError}</p>
            )}

            <button
              type="submit"
              disabled={isRegistering}
              className="border-none btn btn-primary hover:bg-secondary"
            >
              {isRegistering ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Verify & Register"
              )}
            </button>

            <div className="flex items-center justify-between mt-2">
              <button
                type="button"
                className="text-sm text-primary hover:underline"
                onClick={() => setStep("form")}
              >
                ← Back
              </button>
              <button
                type="button"
                className="text-sm text-primary hover:underline disabled:text-gray-400"
                disabled={otpCooldown > 0 || isSendingOtp}
                onClick={async () => {
                  try {
                    await sendOtp({ email }).unwrap();
                    toast.success("OTP resent!");
                    setOtpCooldown(60);
                  } catch {
                    toast.error("Failed to resend OTP");
                  }
                }}
              >
                {otpCooldown > 0 ? `Resend in ${otpCooldown}s` : "Resend OTP"}
              </button>
            </div>
          </form>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
