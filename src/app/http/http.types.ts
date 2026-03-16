import type { AxiosRequestConfig } from "axios";

export interface ApiEnvelope<T> {
  data: T;
  message?: string;
  meta?: Record<string, unknown>;
}

export interface ApiErrorPayload {
  message?: string;
  code?: string;
  errors?: Record<string, string | string[]>;
  meta?: Record<string, unknown>;
}

export type AppErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "VALIDATION"
  | "TOO_MANY_REQUESTS"
  | "TIMEOUT"
  | "CANCELLED"
  | "NETWORK"
  | "SERVER_ERROR"
  | "UNKNOWN";

export interface AppErrorOptions {
  code: AppErrorCode;
  message: string;
  status?: number;
  details?: unknown;
  originalError?: unknown;
}

export class AppError extends Error {
  code: AppErrorCode;
  status?: number;
  details?: unknown;
  originalError?: unknown;

  constructor(options: AppErrorOptions) {
    super(options.message);
    this.name = "AppError";
    this.code = options.code;
    this.status = options.status;
    this.details = options.details;
    this.originalError = options.originalError;
  }
}

export type RequestConfig<D = unknown> = AxiosRequestConfig<D>;

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
}
