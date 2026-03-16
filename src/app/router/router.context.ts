import type { QueryClient } from "@tanstack/react-query";

export interface AuthState {
  isAuthenticated: boolean;
  userId?: string;
  permissions?: string[];
}

export interface AppRouterContext {
  queryClient: QueryClient;
  auth: AuthState;
}
