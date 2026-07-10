"use client";

import Image from "next/image";
import Navbar from "@/components/layouts/Navbar";
import Sidebar from "@/components/layouts/Sidebar";
import HomePage from "@/features/home/HomePage";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useRouter } from "next/navigation";

export default function Home() {
  return <HomePage />;
}
