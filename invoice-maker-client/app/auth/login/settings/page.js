"use client";
import { useAuth } from "@/app/context/AuthContext";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const ProfileSettings = () => {
  const { handleUpdatePassword } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  // Reference Function to handle update password
  const ReferenceToUpdatePassword = (e) => {
    e.preventDefault();
    handleUpdatePassword(password);
  };

  useEffect(() => {
    if (
      password.length &&
      confirmPassword.length &&
      password !== confirmPassword
    ) {
      setError("Password didn't match");
    } else {
      setError("");
    }

    if (password.length && password.length < 6) {
      setError("Password must be at least 6 characters");
    }
  }, [confirmPassword, password]);

  return (
    <div className="bg-[#F7F7F9] dark:bg-secondary w-full h-[100vh] p-4 dark:text-accent ">
      <form
        onSubmit={ReferenceToUpdatePassword}
        className="bg-white dark:bg-neutral p-2 md:p-4 rounded-lg max-w-sm  mx-auto"
      >
        <div className="flex justify-between mb-4">
          <p>Update Password</p>
          <button type="button" onClick={() => setIsHidden(!isHidden)}>
            {!isHidden ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <input
          type={isHidden ? "password" : "text"}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full mb-4"
          placeholder="New Password"
          required
        />{" "}
        <br />
        <input
          type={isHidden ? "password" : "text"}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input input-bordered w-full mb-1"
          placeholder="Confirm Password"
          required
        />{" "}
        <br />
        {error.length > 0 && <p className="text-rose-400">{error}</p>}
        <button className="btn mt-4 " disabled={error.length && true}>
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
