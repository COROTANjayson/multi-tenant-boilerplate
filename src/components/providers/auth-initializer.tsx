"use client";

import { useEffect } from "react";
import { User } from "@/types/auth";
import { useAuthStore } from "@/app/store/auth.store";

interface AuthInitializerProps {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
}

export default function AuthInitializer({ isAuthenticated, accessToken, user }: AuthInitializerProps) {
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    setAuth({
      isAuthenticated,
      accessToken,
      user,
    });
  }, [isAuthenticated, accessToken, user, setAuth]);

  return null;
}
