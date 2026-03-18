import * as React from "react";
import { cn } from "../form.utils";
import { useFormContext } from "./FormContext";

export type FormRootProps = Omit<
  React.ComponentPropsWithoutRef<"form">,
  "onSubmit"
>;

export function FormRoot({
  className,
  noValidate = true,
  children,
  ...props
}: FormRootProps): React.JSX.Element {
  const form = useFormContext();

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      void form.handleSubmit();
    },
    [form],
  );

  return (
    <form
      className={cn(className)}
      noValidate={noValidate}
      onSubmit={handleSubmit}
      {...props}
    >
      {children}
    </form>
  );
}

export type SubmitButtonProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "type"
> & {
  loadingText?: string;
};

export function SubmitButton({
  className,
  children,
  disabled,
  loadingText = "Submitting...",
  ...props
}: SubmitButtonProps): React.JSX.Element {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting] as const}
    >
      {([canSubmit, isSubmitting]) => (
        <button
          type="submit"
          disabled={(disabled ?? !canSubmit) || isSubmitting}
          className={cn(
            "inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        >
          {isSubmitting ? loadingText : children}
        </button>
      )}
    </form.Subscribe>
  );
}
