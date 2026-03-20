import { STORAGE_KEYS, StorageService } from "@/services/storage";
import type { UserRole } from "@/shared/constants/user_role";
import type { User } from "@/shared/types/user";
import type { QueryClient } from "@tanstack/react-query";

export interface AuthState {
  user?: User;
  permissions?: string[];
  roles?: UserRole[];
}

export interface AppRouterContext {
  queryClient: QueryClient;
  auth: AuthState;
}

export const setAuthContext = () => {
  const user = StorageService.getData<User>(STORAGE_KEYS.USER);

  if (!user) return undefined;
  const auth: AuthState = {
    user: user,
    permissions: [],
    roles: user ? user.roles : [],
  };

  return auth;
};
