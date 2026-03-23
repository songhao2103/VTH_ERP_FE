import * as React from "react";
import { functionalUpdate, type Updater } from "@tanstack/react-table";

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}) {
  const [internalValue, setInternalValue] = React.useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? (value as T) : internalValue;

  const valueRef = React.useRef(currentValue);

  React.useEffect(() => {
    valueRef.current = currentValue;
  }, [currentValue]);

  const setValue = React.useCallback(
    (updater: Updater<T>) => {
      const nextValue = functionalUpdate(updater, valueRef.current);

      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onChange?.(nextValue);
    },
    [isControlled, onChange],
  );

  return [currentValue, setValue] as const;
}
