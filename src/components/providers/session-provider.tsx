"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/app/store/auth.store";
import { authService } from "@/services/auth.service";

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Check if store has hydrated from localStorage
    const checkHydration = () => {
      if (useAuthStore.persist.hasHydrated()) {
        setIsHydrated(true);
      } else {
        setTimeout(checkHydration, 10);
      }
    };
    checkHydration();
  }, []);

  const { data: user, isError } = useQuery({
    queryKey: ["me"],
    queryFn: authService.getMe,
    enabled: isHydrated && isAuthenticated, // Only fetch if hydrated AND we think we are logged in
    retry: false,
  });

  useEffect(() => {
    if (user) {
      setUser(user); 
    }
  }, [user, setUser]);

  useEffect(() => {
    if (isError) {
      logout();
    }
  }, [isError, logout]);

  return <>{children}</>;
}
