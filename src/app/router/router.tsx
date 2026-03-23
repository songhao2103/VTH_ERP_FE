import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { type AppRouterContext, type AuthState } from "./router.context";

// eslint-disable-next-line react-refresh/only-export-components
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
