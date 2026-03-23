import type { ApiErrorPayload } from "@/app/http/http.types";
import { useAppMutation } from "@/app/query/useAppMutation";
import { authApi } from "./auth.api";
import type { PayloadLogin, ResponseLogin } from "../types/auth.type.api";

export const useLogin = ({
  onError,
  onSuccess,
}: {
  onError?: (error: ApiErrorPayload | null) => void;
  onSuccess?: (data: ResponseLogin) => void;
}) => {
  return useAppMutation({
    mutationFn: (payload: PayloadLogin) => authApi.login(payload),
    onError: (error) => {
      onError?.(error);
    },
    onSuccess: (data) => {
      onSuccess?.(data.data);
    },
  });
};
