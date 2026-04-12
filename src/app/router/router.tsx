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
    defaultPendingComponent: DefaultPendingComponent,
    defaultNotFoundComponent: DefaultNotFoundComponent,
  });

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof initRouter>;
  }
}

export function DefaultPendingComponent() {
  return <div>Loading...</div>;
}

export function DefaultNotFoundComponent() {
  return <div>Not found</div>;
}
