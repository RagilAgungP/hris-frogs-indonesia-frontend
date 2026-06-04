import { create } from "zustand";

type User = {
  name?: string;
  email: string;
  role?: "ADMIN" | "HR" | "EMPLOYEE" | "ADMINISTRATOR";};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;

  login: (payload: {
    email: string;
    password: string;
    name?: string;
    role?: User["role"];
  }) => void;

  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (payload) => {
    set({
      user: {
        email: payload.email,
        name: payload.name,
        role: payload.role ?? "ADMINISTRATOR",
      },
      isAuthenticated: true,
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));