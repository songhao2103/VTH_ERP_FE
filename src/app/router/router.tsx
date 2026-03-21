import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { type AppRouterContext, type AuthState } from "./router.context";

export const initRouter = (auth: AuthState) =>
  createRouter({
    routeTree,
    context: {
      auth: auth,
      queryClient: undefined!,
    } as AppRouterContext,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
  });

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof initRouter>;
  }
}
