import type React from "react";

export const composeEventHandlers = <E>(
  userHandler: ((event: E) => void) | undefined,
  internalHandler: ((event: E) => void) | undefined,
) => {
  return (event: E) => {
    userHandler?.(event);

    const defaultPrevented =
      typeof event === "object" &&
      event !== null &&
      "defaultPrevented" in (event as object)
        ? Boolean((event as { defaultPrevented?: boolean }).defaultPrevented)
        : false;

    if (!defaultPrevented) {
      internalHandler?.(event);
    }
  };
};

export const assignRef = <T>(
  ref: React.Ref<T> | undefined,
  value: T | null,
) => {
  if (!ref) return;

  if (typeof ref === "function") {
    ref(value);
    return;
  }

  if ("current" in ref) {
    (ref as React.MutableRefObject<T | null>).current = value;
  }
};

export const isPlainLeftClick = (
  event: React.MouseEvent<HTMLElement>,
): boolean => {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.altKey &&
    !event.shiftKey
  );
};

export const isKeyboardOpenKey = (event: React.KeyboardEvent<HTMLElement>) => {
  return (
    event.key === "Enter" || event.key === " " || event.key === "ArrowDown"
  );
};

export const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");
