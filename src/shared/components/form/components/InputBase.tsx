import * as React from "react";
import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "./FormContext";
import { FormItem } from "./FormItem";
import { FormLabel } from "./FormLabel";
import { FormControl } from "./FormControl";
import { FormDescription } from "./FormDescription";
import { FormMessage } from "./FormMessage";
import { cn } from "../form.utils";

export type InputBaseProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "value" | "defaultValue" | "onChange" | "onBlur" | "type"
> & {
  label?: string;
  description?: string;
  placeholder?: string;
  type?: "text" | "password" | "email";
  disabled?: boolean;
};

type InputElementProps = Omit<InputBaseProps, "label" | "description">;

const InputElement = React.forwardRef<HTMLInputElement, InputElementProps>(
  function InputElement(
    { placeholder, type = "text", disabled, className, ...props },
    ref,
  ) {
    const field = useFieldContext<string>();
    const value = useStore(field.store, (state) => state.value) ?? "";

    return (
      <input
        ref={ref}
        id={props.id}
        name={String(field.name)}
        value={value}
        placeholder={placeholder}
        type={type}
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

export const InputBase = React.forwardRef<HTMLInputElement, InputBaseProps>(
  function InputBase({ label, description, ...props }, ref) {
    if (!label && !description) {
      return <InputElement ref={ref} {...props} />;
    }

    return (
      <FormItem>
        {label ? <FormLabel>{label}</FormLabel> : null}

        <FormControl includeDescription={Boolean(description)}>
          <InputElement ref={ref} {...props} />
        </FormControl>

        {description ? <FormDescription>{description}</FormDescription> : null}
        <FormMessage />
      </FormItem>
    );
  },
);
