import axios from "axios";
import { publicApi } from "./http.public";
import { createHttpClient } from "./http.client";
import { tokenService } from "./token.service";
import { HTTP_CONFIG } from "./http.config";
import {
  AppError,
  type ApiEnvelope,
  type RefreshTokenResponse,
} from "./http.types";
import { setAuthorizationHeader, unwrapApiData } from "./http.utils";

export const privateApi = createHttpClient({
  withAuth: true,
});

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = tokenService.getRefreshToken();

  if (!refreshToken) {
    throw new AppError({
      code: "UNAUTHORIZED",
      message: "Session expired",
    });
  }

  const response = await publicApi.post<
    RefreshTokenResponse | ApiEnvelope<RefreshTokenResponse>
  >(
    HTTP_CONFIG.refreshEndpoint,
    { refreshToken },
    {
      skipAuth: true,
    },
  );

  const payload = unwrapApiData(response.data);

  if (!payload?.accessToken) {
    throw new AppError({
      code: "UNAUTHORIZED",
      message: "Invalid refresh token response",
    });
  }

  tokenService.setTokens(payload.accessToken, payload.refreshToken);

  return payload.accessToken;
};

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalConfig = error.config;

    if (!originalConfig || originalConfig.skipAuth) {
      return Promise.reject(error);
    }

    const isUnauthorized = error.response?.status === 401;

    if (!isUnauthorized || originalConfig._retry) {
      return Promise.reject(error);
    }

    originalConfig._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      const newAccessToken = await refreshPromise;

      setAuthorizationHeader(originalConfig, newAccessToken);

      return privateApi(originalConfig);
    } catch (refreshError) {
      tokenService.clearTokens();

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("auth:unauthorized"));
      }

      return Promise.reject(refreshError);
    }
  },
);
