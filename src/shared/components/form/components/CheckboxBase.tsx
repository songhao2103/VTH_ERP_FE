import * as React from "react";
import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "./FormContext";
import { FormItem } from "./FormItem";
import { FormLabel } from "./FormLabel";
import { FormControl } from "./FormControl";
import { FormDescription } from "./FormDescription";
import { FormMessage } from "./FormMessage";
import { cn } from "../form.utils";

export type CheckboxBaseProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "value" | "defaultValue" | "checked" | "onChange" | "onBlur" | "type"
> & {
  label?: string;
  description?: string;
  disabled?: boolean;
};

type CheckboxElementProps = Omit<CheckboxBaseProps, "label" | "description">;

const CheckboxElement = React.forwardRef<
  HTMLInputElement,
  CheckboxElementProps
>(function CheckboxElement({ disabled, className, ...props }, ref) {
  const field = useFieldContext<boolean>();
  const checked = Boolean(useStore(field.store, (state) => state.value));

  return (
    <input
      ref={ref}
      id={props.id}
      type="checkbox"
      name={String(field.name)}
      checked={checked}
      disabled={disabled}
      onBlur={() => field.handleBlur()}
      onChange={(event) => field.handleChange(event.target.checked)}
      className={cn(
        "h-4 w-4 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});

export const CheckboxBase = React.forwardRef<
  HTMLInputElement,
  CheckboxBaseProps
>(function CheckboxBase({ label, description, ...props }, ref) {
  if (!label && !description) {
    return <CheckboxElement ref={ref} {...props} />;
  }

  return (
    <FormItem>
      <div className="flex items-start gap-2">
        <FormControl includeDescription={Boolean(description)}>
          <CheckboxElement ref={ref} {...props} />
        </FormControl>

        <div className="flex flex-col gap-1">
          {label ? <FormLabel className="leading-5">{label}</FormLabel> : null}
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
        </div>
      </div>

      <FormMessage />
    </FormItem>
  );
});
