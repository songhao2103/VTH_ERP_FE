import axios, { type AxiosError } from "axios";
import { AppError, type ApiErrorPayload } from "./http.types";

export const getErrorMessageFromPayload = (
  payload?: ApiErrorPayload,
): string | undefined => {
  if (!payload) return undefined;

  if (typeof payload.message === "string" && payload.message.trim()) {
    return payload.message;
  }

  return undefined;
};

export const normalizeHttpError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (!axios.isAxiosError(error)) {
    return new AppError({
      code: "UNKNOWN",
      message: error instanceof Error ? error.message : "Unknown error",
      originalError: error,
    });
  }

  const axiosError = error as AxiosError<ApiErrorPayload>;

  if (axiosError.code === "ERR_CANCELED") {
    return new AppError({
      code: "CANCELLED",
      message: "Request was cancelled",
      originalError: error,
    });
  }

  if (axiosError.code === "ECONNABORTED") {
    return new AppError({
      code: "TIMEOUT",
      message: "Request timeout",
      originalError: error,
    });
  }

  if (axiosError.response) {
    const status = axiosError.response.status;
    const payload = axiosError.response.data;
    const message = getErrorMessageFromPayload(payload);
    const details = payload?.errors;

    switch (status) {
      case 400:
        return new AppError({
          code: "BAD_REQUEST",
          status,
          message: message || "Bad request",
          details,
          originalError: error,
        });

      case 401:
        return new AppError({
          code: "UNAUTHORIZED",
          status,
          message: message || "Unauthorized",
          details,
          originalError: error,
        });

      case 403:
        return new AppError({
          code: "FORBIDDEN",
          status,
          message: message || "Forbidden",
          details,
          originalError: error,
        });

      case 404:
        return new AppError({
          code: "NOT_FOUND",
          status,
          message: message || "Resource not found",
          details,
          originalError: error,
        });

      case 409:
        return new AppError({
          code: "CONFLICT",
          status,
          message: message || "Conflict",
          details,
          originalError: error,
        });

      case 422:
        return new AppError({
          code: "VALIDATION",
          status,
          message: message || "Validation failed",
          details,
          originalError: error,
        });

      case 429:
        return new AppError({
          code: "TOO_MANY_REQUESTS",
          status,
          message: message || "Too many requests",
          details,
          originalError: error,
        });

      default:
        if (status >= 500) {
          return new AppError({
            code: "SERVER_ERROR",
            status,
            message: message || "Internal server error",
            details,
            originalError: error,
          });
        }

        return new AppError({
          code: "UNKNOWN",
          status,
          message: message || `HTTP error ${status}`,
          details,
          originalError: error,
        });
    }
  }

  if (axiosError.request) {
    return new AppError({
      code: "NETWORK",
      message: "Network error or no response received",
      originalError: error,
    });
  }

  return new AppError({
    code: "UNKNOWN",
    message: axiosError.message || "Unexpected request error",
    originalError: error,
  });
};
