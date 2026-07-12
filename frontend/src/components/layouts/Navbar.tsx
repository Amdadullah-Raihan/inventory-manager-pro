"use client";

//external imports
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaCircleUser,
  FaFileInvoice,
  FaGear,
  FaMagnifyingGlass,
  FaMobileScreenButton,
  FaMoon,
  FaPlus,
  FaRightFromBracket,
  FaSun,
  FaSunPlantWilt,
  FaUser,
} from "react-icons/fa6";
import {
  BsBagCheckFill,
  BsMoon,
  BsMoonStars,
  BsSearch,
  BsSun,
} from "react-icons/bs";
import { HiOutlineDocument, HiOutlineDocumentPlus } from "react-icons/hi2";
import { GrSettingsOption } from "react-icons/gr";
import { TbMoonStars, TbShoppingBagPlus } from "react-icons/tb";

//internal imports
import logo from "@/assets/logo/cn-computer-logo-removebg-preview.png";
import {
  AiOutlineMenu,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
} from "react-icons/ai";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { PiMoonStars } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import { setDarkMode } from "@/redux/slices/darkModeSlice";
import { setCollapsed } from "@/redux/slices/sidebarSlice";
import { setTimeInterval } from "@/redux/slices/timeIntervalSlice";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, isLoading } = useAppSelector((s) => s.auth);
  const timeInterval = useAppSelector((s) => s.timeInterval.timeInterval);
  const { isCollapsed } = useAppSelector((s) => s.sidebar);
  const isDark = useAppSelector((s) => s.darkMode.isDark);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await dispatch(logout());
    router.push("/");
  };

  return (
    <div className="navbar justify-between bg-base-100 shadow-b-md lg:dark:bg-secondary dark:bg-neutral">
      <div>
        <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
          <AiOutlineMenuUnfold className="bg-primary p-1 w-8 h-8 rounded-lg text-2xl mr-2 text-accent" />
        </label>
        {user.email && pathname === "/" && (
          <div className="dropdown dropdown-end mr-2 ">
            <select
              className="select  select-bordered select-sm w-full  max-w-xs dark:bg-secondary dark:text-accent         dark:border-gray-500 ml-1"
              value={timeInterval}
              onChange={(e) => dispatch(setTimeInterval(e.target.value))}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option disabled value="all">
                All
              </option>
            </select>
          </div>
        )}
      </div>

      <div>
        {
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              onChange={() =>
                dispatch(setDarkMode(isDark === "dark" ? "light" : "dark"))
              }
              checked={isDark === "dark" ? true : false}
            />

            {/* sun icon */}
            <BsSun className="text-accent font-bold swap-on fill-current w-8 h-8 mr-4 " />

            {/* moon icon */}
            <PiMoonStars className="text-gray-600  swap-off fill-current w-8 h-8 mr-4 " />
          </label>
        }

        {user.email ? (
          <div className="dropdown dropdown-end ">
            <label
              tabIndex={0}
              className="btn border-none btn-ghost  btn-circle avatar"
            >
              <div className="w-10 rounded-full ">
                <Image
                  src={user.photoURL as string}
                  alt="DP"
                  width={100}
                  height={100}
                />
              </div>
            </label>
            <ul
              id="nav-dropdown"
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 dark:bg-primary dark:text-accent"
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <Link href="/settings" className="justify-between">
                  Settings <span className="badge text-primary">New</span>
                </Link>
              </li>
              <li onClick={handleSignOut}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            href="/login"
            className="btn btn-outline border-[#5a66f1] text-[#5166f1]"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
