import "axios";

declare module "axios" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  export interface AxiosRequestConfig<D = any> {
    skipAuth?: boolean;
    skipErrorHandler?: boolean;
    _retry?: boolean;
  }
}

export {};
