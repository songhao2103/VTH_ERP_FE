import { QueryClient } from "@tanstack/react-query";

// import { normalizeApiError } from "@/shared/api/http-error";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const shouldRetry = (failureCount: number, error: unknown) => {
  //   const normalized = normalizeApiError(error);

  //   if (
  //     normalized.status &&
  //     normalized.status >= 400 &&
  //     normalized.status < 500
  //   ) {
  //     return false;
  //   }

  return failureCount < 2;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      retry: shouldRetry,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
