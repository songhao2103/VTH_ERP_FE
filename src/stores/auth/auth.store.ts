import { create } from "zustand";
import type { AuthStore, AuthStoreState } from "./auth.types";

export const useAuthStore = create<AuthStore>()((set) => ({
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
