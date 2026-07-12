"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";

const publicPaths = ["/login", "/register"];

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAppSelector((s) => s.auth);
  const router = useRouter();
  const pathname = usePathname();

  const isPublicPath = publicPaths.includes(pathname);

  const needsRedirect =
    (!user?.email && !isPublicPath) || // unauthenticated → protected route
    (user?.email && isPublicPath); // authenticated → public route

  useEffect(() => {
    if (isLoading) return; // don't redirect until auth state resolves

    if (!user?.email && !isPublicPath) {
      router.push(`/login?from=${encodeURIComponent(pathname)}`);
    }

    if (user?.email && isPublicPath) {
      router.push("/");
    }
  }, [router, user?.email, isLoading, isPublicPath, pathname]);

  // Show spinner while: auth is loading, OR a redirect is pending (don't flash content)
  if (isLoading || needsRedirect) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
