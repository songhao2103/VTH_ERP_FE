import type { AuthState } from "../router/router.context";
import { redirect } from "@tanstack/react-router";

export const authGuard = async (auth: AuthState) => {
  if (!auth?.user) {
    console.warn("Unauthorized access. Redirecting to login page.");
    throw redirect({
      to: "/auth/login",
    });
  }
};
