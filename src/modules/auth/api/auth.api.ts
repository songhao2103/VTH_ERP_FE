/* eslint-disable @typescript-eslint/no-explicit-any */
import { publicApi } from "@/app/http/http.public";
import type { PayloadLogin, ResponseLogin } from "../type/auth.api";
import type { ApiEnvelope } from "@/app/http/http.types";

export const authApi = {
  login: (payload: PayloadLogin): Promise<ApiEnvelope<ResponseLogin>> => {
    return publicApi.post("/hola/user-login", payload);
  },
};
