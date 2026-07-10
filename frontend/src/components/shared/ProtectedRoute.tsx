"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useAuth } from "@/providers/AuthContext";

// Paths that don't require authentication
const publicPaths = ["/login", "/register"];

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicPath = publicPaths.includes(pathname);

  useEffect(() => {
    // Only redirect when auth state is resolved and not on a public path
    if (!isLoading && !user?.email && !isPublicPath) {
      router.push("/login");
    }

    // If user is authenticated and on a public path, redirect to home
    if (!isLoading && user?.email && isPublicPath) {
      router.push("/");
    }
  }, [router, user?.email, isLoading, isPublicPath]);

  // Show a loading screen while Firebase restores the auth state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // On public paths (login/register), render children without the app shell
  if (isPublicPath) {
    return children;
  }

  return children;
};

export default ProtectedRoute;
