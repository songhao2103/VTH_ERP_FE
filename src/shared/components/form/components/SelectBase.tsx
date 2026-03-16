import * as React from "react";
import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "./FormContext";
import { cn } from "../form.utils";
import { FormItem } from "./FormItem";
import { FormLabel } from "./FormLabel";
import { FormControl } from "./FormControl";
import { FormMessage } from "./FormMessage";
import { FormDescription } from "./FormDescription";

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type SelectBaseProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "name" | "value" | "defaultValue" | "onChange" | "onBlur"
> & {
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  options: SelectOption[];
};

type SelectElementProps = Omit<SelectBaseProps, "label" | "description">;

const SelectElement = React.forwardRef<HTMLSelectElement, SelectElementProps>(
  function SelectElement(
    { options, placeholder, disabled, className, ...props },
    ref,
  ) {
    const field = useFieldContext<string>();
    const value = useStore(field.store, (state) => state.value) ?? "";

    return (
      <select
        ref={ref}
        id={props.id}
        name={String(field.name)}
        value={value}
        disabled={disabled}
        onBlur={() => field.handleBlur()}
        onChange={(event) => field.handleChange(event.target.value)}
        className={cn(
          "border rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    );
  },
);

export const SelectBase = React.forwardRef<HTMLSelectElement, SelectBaseProps>(
  function SelectBase({ label, description, ...props }, ref) {
    if (!label && !description) {
      return <SelectElement ref={ref} {...props} />;
    }

    return (
      <FormItem>
        {label ? <FormLabel>{label}</FormLabel> : null}

        <FormControl includeDescription={Boolean(description)}>
          <SelectElement ref={ref} {...props} />
        </FormControl>

        {description ? <FormDescription>{description}</FormDescription> : null}
        <FormMessage />
      </FormItem>
    );
  },
);
