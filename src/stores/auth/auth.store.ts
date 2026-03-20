import { create } from "zustand";
import type { AuthStoreState } from "./auth.types";

export const useAuthStore = create<AuthStoreState>()((set) => ({
  user: null,
  permissions: [],
  roles: [],
  setAuth: (auth: AuthStoreState) => {
    set({
      user: auth.user,
      permissions: auth.permissions,
      roles: auth.roles,
    });
  },
  logout: () => {
    set({
      user: null,
      permissions: [],
      roles: [],
    });
  },
}));
