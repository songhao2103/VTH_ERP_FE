import { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";
import type { ApiEnvelope } from "./http.types";

export const isApiEnvelope = <T>(value: unknown): value is ApiEnvelope<T> => {
  return typeof value === "object" && value !== null && "data" in value;
};

export const unwrapApiData = <T>(payload: T | ApiEnvelope<T>): T => {
  return isApiEnvelope<T>(payload) ? payload.data : payload;
};

export const ensureAxiosHeaders = <D = unknown>(
  config: InternalAxiosRequestConfig<D>,
) => {
  config.headers = AxiosHeaders.from(config.headers);
  return config.headers;
};

export const setAuthorizationHeader = <D = unknown>(
  config: InternalAxiosRequestConfig<D>,
  token: string,
) => {
  const headers = ensureAxiosHeaders(config);
  headers.set("Authorization", `Bearer ${token}`);
};

export const removeAuthorizationHeader = <D = unknown>(
  config: InternalAxiosRequestConfig<D>,
) => {
  const headers = ensureAxiosHeaders(config);
  headers.delete("Authorization");
};
