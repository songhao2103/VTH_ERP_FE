import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { setAuthContext, type AppRouterContext } from "./router.context";

export const router = createRouter({
  routeTree,
  context: {
    auth: setAuthContext(),
    queryClient: undefined!,
  } as AppRouterContext,
  scrollRestoration: true,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
