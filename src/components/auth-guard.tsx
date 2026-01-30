"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/auth.store";

export function AuthGuard({ 
  children, 
  initialIsAuthenticated 
}: { 
  children: React.ReactNode;
  initialIsAuthenticated?: boolean;
}) {
  const router = useRouter();
  const storeIsAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    useAuthStore.persist.rehydrate();
    setMounted(true);
  }, []);

  const isAuthenticated = mounted ? storeIsAuthenticated : initialIsAuthenticated;

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/login");
    }
  }, [mounted, isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
