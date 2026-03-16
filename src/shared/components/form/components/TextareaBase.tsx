import * as React from "react";
import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "./FormContext";
import { cn } from "../form.utils";
import { FormItem } from "./FormItem";
import { FormLabel } from "./FormLabel";
import { FormControl } from "./FormControl";
import { FormMessage } from "./FormMessage";
import { FormDescription } from "./FormDescription";

export type TextareaBaseProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "name" | "value" | "defaultValue" | "onChange" | "onBlur"
> & {
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
};

type TextareaElementProps = Omit<TextareaBaseProps, "label" | "description">;

const TextareaElement = React.forwardRef<
  HTMLTextAreaElement,
  TextareaElementProps
>(function TextareaElement(
  { placeholder, disabled, rows = 4, className, ...props },
  ref,
) {
  const field = useFieldContext<string>();
  const value = useStore(field.store, (state) => state.value) ?? "";

  return (
    <textarea
      ref={ref}
      id={props.id}
      name={String(field.name)}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      onBlur={() => field.handleBlur()}
      onChange={(event) => field.handleChange(event.target.value)}
      className={cn(
        "border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});

export const TextareaBase = React.forwardRef<
  HTMLTextAreaElement,
  TextareaBaseProps
>(function TextareaBase({ label, description, ...props }, ref) {
  if (!label && !description) {
    return <TextareaElement ref={ref} {...props} />;
  }

  return (
    <FormItem>
      {label ? <FormLabel>{label}</FormLabel> : null}

      <FormControl includeDescription={Boolean(description)}>
        <TextareaElement ref={ref} {...props} />
      </FormControl>

      {description ? <FormDescription>{description}</FormDescription> : null}
      <FormMessage />
    </FormItem>
  );
});
