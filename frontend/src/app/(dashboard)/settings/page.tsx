"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changePassword, clearError } from "@/redux/slices/authSlice";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-hot-toast";

const ProfileSettings = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((s) => s.auth);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (newPassword !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setValidationError("New password must be at least 6 characters");
      return;
    }

    const result = await dispatch(
      changePassword({ currentPassword, newPassword }),
    );
    if (changePassword.fulfilled.match(result)) {
      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <div className="bg-[#F7F7F9] dark:bg-secondary w-full h-[100vh] p-4 dark:text-accent ">
      <form
        onSubmit={handleUpdatePassword}
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
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="input input-bordered w-full mb-4"
          placeholder="Current Password"
          required
        />
        <input
          type={isHidden ? "password" : "text"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="input input-bordered w-full mb-4"
          placeholder="New Password"
          required
        />
        <input
          type={isHidden ? "password" : "text"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input input-bordered w-full mb-1"
          placeholder="Confirm New Password"
          required
        />
        {validationError && (
          <p className="text-rose-400 text-sm mt-1">{validationError}</p>
        )}
        <button type="submit" className="btn mt-4" disabled={!!validationError}>
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
