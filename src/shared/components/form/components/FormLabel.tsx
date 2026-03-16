import * as React from "react";
import { useFormField } from "../useFormField";
import { cn } from "../form.utils";

export type FormLabelProps = React.ComponentPropsWithoutRef<"label">;

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  function FormLabel({ className, htmlFor, ...props }, ref) {
    const { formItemId } = useFormField();

    return (
      <label
        ref={ref}
        htmlFor={htmlFor ?? formItemId}
        className={cn("text-sm font-medium text-gray-700", className)}
        {...props}
      />
    );
  },
);
