import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import type { QueryKey } from "@tanstack/react-query";
import type { ApiErrorPayload } from "../http/http.types";
import { getErrorMessageFromPayload } from "../http/http.errors";
// import useAlertStore from "@/stores/alert/store";
// import { getErrorMessage } from "@/lib/axios";

type InvalidateItem = QueryKey | string;

type UseAppMutationOptions<TData, TVars, TContext = unknown> = {
  mutationFn: (vars: TVars) => Promise<TData>;
  successMessage?: string; // hiển thị khi success
  errorMessagePrefix?: string; // prefix cho lỗi
  invalidateQueries?: InvalidateItem[]; // query keys cần invalidate

  // cho phép ghi đè lại callback nếu cần
  onSuccess?: (
    data: TData,
    vars: TVars,
    ctx?: TContext,
  ) => void | Promise<void>;

  onError?: (
    error: ApiErrorPayload | null,
    vars: TVars,
    ctx?: TContext,
  ) => void | Promise<void>;

  onMutate?: (vars: TVars) => TContext | Promise<TContext>;

  onSettled?: (
    data: TData | undefined,
    error: ApiErrorPayload | null,
    vars: TVars,
    ctx?: TContext,
  ) => void;

  useGlobalLoading?: boolean;
};

export function useAppMutation<
  TData = unknown,
  TVars = void,
  TContext = unknown,
>(
  opts: UseAppMutationOptions<TData, TVars, TContext>,
): UseMutationResult<TData, ApiErrorPayload, TVars, TContext> {
  const qc = useQueryClient();
  // const { setLoading, showPopupAlert } = useAlertStore();

  return useMutation<TData, ApiErrorPayload, TVars, TContext>({
    mutationFn: opts.mutationFn,
    onMutate: async (vars) => {
      // opts.useGlobalLoading && setLoading(true);

      if (opts.onMutate) {
        try {
          const ctx = await opts.onMutate(vars);
          return ctx as TContext;
        } catch (e) {
          return undefined as unknown as TContext;
        }
      }
      return undefined as unknown as TContext;
    },

    onSuccess: async (data, vars, ctx) => {
      if (opts.invalidateQueries && opts.invalidateQueries.length) {
        for (const k of opts.invalidateQueries) {
          const qKey = typeof k === "string" ? [k] : k;
          qc.invalidateQueries({ queryKey: qKey });
        }
      }

      if (opts.successMessage) {
        // showPopupAlert(opts.successMessage, "success");
      }

      if (opts.onSuccess) {
        try {
          await opts.onSuccess(data, vars, ctx);
        } catch (e) {
          console.error("useAppMutation onSuccess callback error:", e);
        }
      }
    },
    onError: async (error, vars, ctx) => {
      try {
        if (opts.errorMessagePrefix) {
          const prefix = opts.errorMessagePrefix ?? "";
          const message = prefix + getErrorMessageFromPayload(error);
          // showPopupAlert(message, "error");
          // setLoading(false);
        }
      } catch (error) {
        // showPopupAlert("Lỗi hệ thống", "error");
        // setLoading(false);
      }

      if (opts.onError) await opts.onError(error, vars, ctx);
    },
    onSettled: (data, error, vars, ctx) => {
      // opts.useGlobalLoading && setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (opts.onSettled) opts.onSettled(data as any, error, vars, ctx);
    },
  });
}
