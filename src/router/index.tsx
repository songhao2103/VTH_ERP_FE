import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
// import { useAuthStore } from "@/app/store/authStore";
// import { queryClient } from "@/configs/queryConfig";

export function AppRouterProvider() {
  //   const auth = useAuthStore();

  return (
    <RouterProvider
      router={router}
      //   context={{
      //     auth,
      //     queryClient,
      //   }}
    />
  );
}
