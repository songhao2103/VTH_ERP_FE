import * as React from "react";
import { InputHelperText } from "./InputHelperText";
import { InputLabel } from "./InputLabel";
import { InputWrapper } from "./InputWrapper";
import { getInputClasses } from "./input.styles";
import type { InputProps } from "./input.types";
import clsx from "clsx";

function useComposedRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return React.useCallback(
    (node: T) => {
      for (const ref of refs) {
        if (!ref) continue;
        if (typeof ref === "function") {
          ref(node);
        } else {
          // eslint-disable-next-line react-hooks/immutability
          (ref as React.RefObject<T | null>).current = node;
        }
      }
    },
    [refs],
  );
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      id,
      label,
      helperText,
      error = false,
      disabled = false,
      required = false,
      startIcon,
      endIcon,
      clearable = false,
      size = "md",
      variant = "outlined",
      color = "default",
      containerClassName,
      labelClassName,
      helperTextClassName,
      inputClassName,
      wrapperClassName,
      className,
      value,
      defaultValue,
      onChange,
      onClear,
      type = "text",
      showHelperText = false,
      ...rest
    },
    forwardedRef,
  ) {
    const reactId = React.useId();
    const inputId = id ?? `input-${reactId}`;
    const helperTextId = helperText ? `${inputId}-helper-text` : undefined;

    const internalRef = React.useRef<HTMLInputElement | null>(null);
    const composedRef = useComposedRefs(forwardedRef, internalRef);

    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState(
      defaultValue?.toString() ?? "",
    );

    const currentValue = isControlled ? String(value ?? "") : uncontrolledValue;
    const isClearVisible = clearable && !disabled && currentValue.length > 0;

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
          setUncontrolledValue(event.target.value);
        }
        onChange?.(event);
      },
      [isControlled, onChange],
    );

    const dispatchNativeInputEvent = React.useCallback((nextValue: string) => {
      const input = internalRef.current;
      if (!input) return;

      const nativeSetter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value",
      )?.set;

      nativeSetter?.call(input, nextValue);

      const inputEvent = new Event("input", { bubbles: true });
      input.dispatchEvent(inputEvent);
    }, []);

    const handleClear = React.useCallback(() => {
      const input = internalRef.current;
      if (!input || disabled) return;

      if (isControlled) {
        dispatchNativeInputEvent("");
      } else {
        setUncontrolledValue("");
        dispatchNativeInputEvent("");
      }

      input.focus();
      onClear?.();
    }, [disabled, dispatchNativeInputEvent, isControlled, onClear]);

    return (
      <div className={clsx("w-full", containerClassName, className)}>
        <InputLabel
          htmlFor={inputId}
          label={label}
          required={required}
          disabled={disabled}
          error={error}
          className={labelClassName}
        />

        <InputWrapper
          variant={variant}
          size={size}
          color={color}
          disabled={disabled}
          error={error}
          startIcon={startIcon}
          endIcon={endIcon}
          clearable={clearable}
          showClearButton={isClearVisible}
          onClear={handleClear}
          className={wrapperClassName}
        >
          <input
            {...rest}
            id={inputId}
            ref={composedRef}
            type={type}
            value={isControlled ? value : uncontrolledValue}
            defaultValue={isControlled ? undefined : defaultValue}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            aria-invalid={error || undefined}
            aria-describedby={helperTextId}
            className={clsx(
              getInputClasses({
                variant,
                size,
                color: error ? "danger" : color,
                disabled,
                error,
                hasStartIcon: !!startIcon,
                hasEndIcon: !!endIcon,
                clearable,
              }),
              inputClassName,
            )}
          />
        </InputWrapper>

        <InputHelperText
          id={helperTextId}
          text={helperText}
          disabled={disabled}
          error={error}
          className={helperTextClassName}
          showHelperText={showHelperText}
        />
      </div>
    );
  },
);
