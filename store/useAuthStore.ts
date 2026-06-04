"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; role: string } | null;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: () =>
        set({
          isAuthenticated: true,
          user: { name: "John Doe", role: "Administrator" },
        }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    { name: "frogs-auth" }
  )
);
