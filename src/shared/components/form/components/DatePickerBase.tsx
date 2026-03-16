import * as React from "react";
import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "./FormContext";
import { cn } from "../form.utils";
import { FormItem } from "./FormItem";
import { FormLabel } from "./FormLabel";
import { FormControl } from "./FormControl";
import { FormMessage } from "./FormMessage";
import { FormDescription } from "./FormDescription";

export type DatePickerBaseProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "value" | "defaultValue" | "onChange" | "onBlur" | "type"
> & {
  label?: string;
  description?: string;
  disabled?: boolean;
};

type DateElementProps = Omit<DatePickerBaseProps, "label" | "description">;

const DateElement = React.forwardRef<HTMLInputElement, DateElementProps>(
  function DateElement({ disabled, className, ...props }, ref) {
    const field = useFieldContext<string>();
    const value = useStore(field.store, (state) => state.value) ?? "";

    return (
      <input
        ref={ref}
        id={props.id}
        type="date"
        name={String(field.name)}
        value={value}
        disabled={disabled}
        onBlur={() => field.handleBlur()}
        onChange={(event) => field.handleChange(event.target.value)}
        className={cn(
          "border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);

export const DatePickerBase = React.forwardRef<
  HTMLInputElement,
  DatePickerBaseProps
>(function DatePickerBase({ label, description, ...props }, ref) {
  if (!label && !description) {
    return <DateElement ref={ref} {...props} />;
  }

  return (
    <FormItem>
      {label ? <FormLabel>{label}</FormLabel> : null}

      <FormControl includeDescription={Boolean(description)}>
        <DateElement ref={ref} {...props} />
      </FormControl>

      {description ? <FormDescription>{description}</FormDescription> : null}
      <FormMessage />
    </FormItem>
  );
});
