/* eslint-disable react-hooks/set-state-in-effect */
import { STORAGE_KEYS, StorageService } from "@/services/storage";
import type { UserRole } from "@/shared/constants/user_role";
import type { User } from "@/shared/types/user";
import { useAuthStore } from "@/stores/auth/auth.store";
import { RouterProvider } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { initRouter } from "../router/router";

const InnerProvider = () => {
  const { user, setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (!user) {
      const user = StorageService.getData<User>(STORAGE_KEYS.USER);
      if (!user) return;

      setAuth({
        user: user,
        permissions: [] as string[],
        roles: [] as UserRole[],
      });
    }
    setIsLoading(false);
  }, [user, setAuth]);

  const router = initRouter({
    user: user!,
    permissions: [] as string[],
    roles: [] as UserRole[],
  });

  return <RouterProvider router={router} />;
};
export default InnerProvider;
