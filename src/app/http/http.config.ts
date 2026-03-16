export const HTTP_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "",
  timeout: Number(import.meta.env.VITE_API_TIMEOUT ?? 30000),
  refreshEndpoint: "/auth/refresh",
} as const;
