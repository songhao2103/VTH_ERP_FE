import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSwitch } from "./useSwitch";

import type { SwitchProps } from "./switch.types";
import {
  // getIconSlotClassName,
  getSwitchRootClassName,
  getThumbClassName,
  SWITCH_SIZE_STYLES,
} from "@/shared/components/switch/switch.style";

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked,
      onChange,
      disabled = false,
      size = "md",
      color = "primary",
      startIcon,
      endIcon,
      className,
      id,
      name,
      value,
      type,
      role,
      tabIndex,
      onClick,
      onKeyDown,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...rest
    },
    ref,
  ) => {
    const { checked: isChecked, toggle } = useSwitch({
      checked,
      defaultChecked,
      onChange,
      disabled,
    });

    const state = isChecked ? "checked" : "unchecked";
    const sizeConfig = SWITCH_SIZE_STYLES[size];

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || disabled) return;
      toggle();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || disabled) return;

      if (event.key === "Enter") {
        event.preventDefault();
        toggle();
      }
    };

    return (
      <>
        <button
          {...rest}
          ref={ref}
          id={id}
          name={name}
          value={value}
          type={type ?? "button"}
          role={role ?? "switch"}
          aria-checked={isChecked}
          aria-disabled={disabled || undefined}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          disabled={disabled}
          data-state={state}
          data-disabled={disabled ? "" : undefined}
          tabIndex={disabled ? -1 : tabIndex}
          className={getSwitchRootClassName(size, color, disabled, className)}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          {/* {startIcon ? (
            <span
              aria-hidden="true"
              className={getIconSlotClassName("start", size)}
            >
              <motion.span
                animate={{
                  opacity: isChecked ? 0 : 1,
                  scale: isChecked ? 0.8 : 1,
                }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                {startIcon}
              </motion.span>
            </span>
          ) : null}

          {endIcon ? (
            <span
              aria-hidden="true"
              className={getIconSlotClassName("end", size)}
            >
              <motion.span
                animate={{
                  opacity: isChecked ? 1 : 0,
                  scale: isChecked ? 1 : 0.8,
                }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                {endIcon}
              </motion.span>
            </span>
          ) : null} */}

          <motion.div
            aria-hidden="true"
            data-state={state}
            className={getThumbClassName(size)}
            animate={{
              x: isChecked ? sizeConfig.x : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 0.8,
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {(startIcon || endIcon) && (
                <motion.span
                  key={state}
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.75 }}
                  transition={{ duration: 0.14 }}
                  className="flex h-full w-full items-center justify-center text-neutral-600"
                >
                  {isChecked ? endIcon : startIcon}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </button>

        {name ? (
          <input
            hidden
            readOnly
            tabIndex={-1}
            name={name}
            value={typeof value === "string" ? value : "on"}
            checked={isChecked}
            type="checkbox"
          />
        ) : null}
      </>
    );
  },
);

Switch.displayName = "Switch";

export default Switch;
