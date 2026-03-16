import type { AxiosInstance, AxiosResponse } from "axios";
import { publicApi } from "./http.public";
import { privateApi } from "./http.private";
import { normalizeHttpError } from "./http.errors";
import { unwrapApiData } from "./http.utils";
import type { RequestConfig, ApiEnvelope } from "./http.types";

const createRequester = (client: AxiosInstance) => {
  const request = async <TResponse, TBody = unknown>(
    config: RequestConfig<TBody>,
  ): Promise<TResponse> => {
    try {
      const response = await client.request<
        TResponse | ApiEnvelope<TResponse>,
        AxiosResponse<TResponse | ApiEnvelope<TResponse>>,
        TBody
      >(config);

      return unwrapApiData(response.data);
    } catch (error) {
      if (config.skipErrorHandler) {
        throw error;
      }

      throw normalizeHttpError(error);
    }
  };

  return {
    request,

    get<TResponse>(url: string, config?: RequestConfig) {
      return request<TResponse>({
        ...config,
        method: "get",
        url,
      });
    },

    post<TResponse, TBody = unknown>(
      url: string,
      data?: TBody,
      config?: RequestConfig<TBody>,
    ) {
      return request<TResponse, TBody>({
        ...config,
        method: "post",
        url,
        data,
      });
    },

    put<TResponse, TBody = unknown>(
      url: string,
      data?: TBody,
      config?: RequestConfig<TBody>,
    ) {
      return request<TResponse, TBody>({
        ...config,
        method: "put",
        url,
        data,
      });
    },

    patch<TResponse, TBody = unknown>(
      url: string,
      data?: TBody,
      config?: RequestConfig<TBody>,
    ) {
      return request<TResponse, TBody>({
        ...config,
        method: "patch",
        url,
        data,
      });
    },

    delete<TResponse, TBody = unknown>(
      url: string,
      config?: RequestConfig<TBody>,
    ) {
      return request<TResponse, TBody>({
        ...config,
        method: "delete",
        url,
      });
    },
  };
};

export const http = {
  public: createRequester(publicApi),
  private: createRequester(privateApi),
};
