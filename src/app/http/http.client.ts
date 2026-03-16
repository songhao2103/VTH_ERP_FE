import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { HTTP_CONFIG } from "./http.config";
import { tokenService } from "./token.service";
import { setAuthorizationHeader } from "./http.utils";

type CreateHttpClientOptions = {
  withAuth: boolean;
};

export const createHttpClient = ({
  withAuth,
}: CreateHttpClientOptions): AxiosInstance => {
  const instance = axios.create({
    baseURL: HTTP_CONFIG.baseURL,
    timeout: HTTP_CONFIG.timeout,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    validateStatus: (status) => status >= 200 && status < 300,
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (withAuth && !config.skipAuth) {
        const accessToken = tokenService.getAccessToken();

        if (accessToken) {
          setAuthorizationHeader(config, accessToken);
        }
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
  );

  return instance;
};
