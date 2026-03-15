import * as React from "react";
import type { SwitchProps } from "./switch.types";

type UseSwitchParams = Pick<
  SwitchProps,
  "checked" | "defaultChecked" | "onChange" | "disabled"
>;

export function useSwitch({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
}: UseSwitchParams) {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);

  const currentChecked = isControlled ? Boolean(checked) : internalChecked;

  const setChecked = React.useCallback(
    (next: boolean) => {
      if (disabled) return;

      if (!isControlled) {
        setInternalChecked(next);
      }

      onChange?.(next);
    },
    [disabled, isControlled, onChange],
  );

  const toggle = React.useCallback(() => {
    setChecked(!currentChecked);
  }, [currentChecked, setChecked]);

  return {
    checked: currentChecked,
    setChecked,
    toggle,
    disabled,
    isControlled,
  };
}
