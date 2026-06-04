import { create } from "zustand";

type User = {
  name?: string;
  email: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;

  login: (payload: { email: string; password: string; name?: string }) => void;
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