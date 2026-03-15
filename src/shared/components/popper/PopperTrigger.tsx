import { usePopperContext } from "@/shared/components/popper/popper.context";
import { cn } from "@/shared/components/popper/popper.utils";
import type {
  PopperTriggerProps,
  PopperTriggerRenderProps,
} from "@/shared/components/popper/popper.type";
import React from "react";

const PopperTrigger: React.FC<PopperTriggerProps> = ({
  children,
  leadingIcon,
  trailingIcon,
  className,
  type = "button",
  disabled: disabledProp,
  ...rest
}) => {
  const {
    triggerRef,
    getTriggerProps,
    isOpen,
    disabled: rootDisabled,
  } = usePopperContext();

  const disabled = rootDisabled || disabledProp;

  const setTriggerRef = React.useCallback(
    (node: HTMLElement | null) => {
      triggerRef.current = node;
    },
    [triggerRef],
  );

  const interactionProps = getTriggerProps({
    onClick: rest.onClick as React.MouseEventHandler<HTMLElement> | undefined,
    onMouseEnter: rest.onMouseEnter as
      | React.MouseEventHandler<HTMLElement>
      | undefined,
    onMouseLeave: rest.onMouseLeave as
      | React.MouseEventHandler<HTMLElement>
      | undefined,
    onFocus: rest.onFocus as React.FocusEventHandler<HTMLElement> | undefined,
  });

  const sharedTriggerProps: PopperTriggerRenderProps = {
    setTriggerRef,
    onClick: interactionProps.onClick,
    onMouseEnter: interactionProps.onMouseEnter,
    onMouseLeave: interactionProps.onMouseLeave,
    onFocus: interactionProps.onFocus,
    "aria-expanded": interactionProps["aria-expanded"] ?? false,
    "aria-controls": interactionProps["aria-controls"] ?? "",
    "aria-haspopup": interactionProps["aria-haspopup"],
    "data-state": isOpen ? "open" : "closed",
    "data-disabled": disabled ? "" : undefined,
  };

  if (typeof children === "function") {
    // eslint-disable-next-line react-hooks/refs
    return <>{children(sharedTriggerProps)}</>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onClick, onMouseEnter, onMouseLeave, onFocus, ...buttonRest } = rest;

  return (
    <button
      ref={setTriggerRef as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      className={cn(
        // "inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-900 shadow-sm outline-none transition-colors",
        // "hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-blue-500/30",
        // "disabled:pointer-events-none disabled:opacity-50",
        // "dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800",
        className,
      )}
      {...buttonRest}
      onClick={
        sharedTriggerProps.onClick as React.MouseEventHandler<HTMLButtonElement>
      }
      onMouseEnter={
        sharedTriggerProps.onMouseEnter as React.MouseEventHandler<HTMLButtonElement>
      }
      onMouseLeave={
        sharedTriggerProps.onMouseLeave as React.MouseEventHandler<HTMLButtonElement>
      }
      onFocus={
        sharedTriggerProps.onFocus as React.FocusEventHandler<HTMLButtonElement>
      }
      aria-expanded={sharedTriggerProps["aria-expanded"]}
      aria-controls={sharedTriggerProps["aria-controls"]}
      aria-haspopup={sharedTriggerProps["aria-haspopup"]}
      data-state={sharedTriggerProps["data-state"]}
      data-disabled={sharedTriggerProps["data-disabled"]}
    >
      {leadingIcon ? (
        <span className="shrink-0 [&_svg]:size-4">{leadingIcon}</span>
      ) : null}

      <span className="truncate">{children}</span>

      {trailingIcon ? (
        <span className="shrink-0 [&_svg]:size-4">{trailingIcon}</span>
      ) : null}
    </button>
  );
};

export default PopperTrigger;
