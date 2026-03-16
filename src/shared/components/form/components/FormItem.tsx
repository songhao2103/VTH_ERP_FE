import * as React from "react";
import { cn } from "../form.utils";

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useFormItemContext(): FormItemContextValue {
  const context = React.useContext(FormItemContext);

  if (!context) {
    throw new Error("Form primitives must be used inside <FormItem />.");
  }

  return context;
}

export type FormItemProps = React.ComponentPropsWithoutRef<"div">;

export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  function FormItem({ className, ...props }, ref) {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div
          ref={ref}
          className={cn("flex flex-col gap-1 mb-4", className)}
          {...props}
        />
      </FormItemContext.Provider>
    );
  },
);
