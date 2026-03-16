import * as React from "react";
import { useFormField } from "../useFormField";
import { cn } from "../form.utils";

export type FormMessageProps = React.ComponentPropsWithoutRef<"p">;

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  FormMessageProps
>(function FormMessage({ className, ...props }, ref) {
  const { touched, error, messageId } = useFormField();

  if (!touched || !error) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={messageId}
      className={cn("text-sm text-red-500 mt-1", className)}
      {...props}
    >
      {error}
    </p>
  );
});
