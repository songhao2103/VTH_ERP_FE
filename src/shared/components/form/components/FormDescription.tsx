import * as React from "react";
import { useFormField } from "../useFormField";
import { cn } from "../form.utils";

export type FormDescriptionProps = React.ComponentPropsWithoutRef<"p">;

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(function FormDescription({ className, ...props }, ref) {
  const { descriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={descriptionId}
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  );
});
