import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { type AppRouterContext, type AuthState } from "./router.context";
import type { QueryClient } from "@tanstack/react-query";

export const initRouter = (auth: AuthState, queryClient: QueryClient) =>
  createRouter({
    routeTree,
    context: {
      auth: auth,
      queryClient: queryClient,
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
