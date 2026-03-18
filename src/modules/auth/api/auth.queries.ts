import type { ApiErrorPayload } from "@/app/http/http.types";
import { useAppMutation } from "@/app/query/useAppMutation";
import { authApi } from "./auth.api";
import type { PayloadLogin } from "../type/auth.api";

export const useLogin = ({
  onError,
}: {
  onError?: (error: ApiErrorPayload | null) => void;
}) => {
  return useAppMutation({
    mutationFn: (payload: PayloadLogin) => authApi.login(payload),
    onError: (error) => {
      onError?.(error);
    },
  });
};
