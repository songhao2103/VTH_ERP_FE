import React from "react";
import { useDropdown } from "../hooks/useDropdown";
import {
  composeEventHandlers,
  cx,
  isKeyboardOpenKey,
  isPlainLeftClick,
} from "../utils/eventGuards";
import type { DropdownTriggerProps } from "../types/dropdown.types";

export const DropdownTrigger = React.forwardRef<
  HTMLElement,
  DropdownTriggerProps
>(function DropdownTrigger(
  {
    children,
    trigger: triggerOverride,
    disabled: disabledProp = false,
    className,
    as = "div",
    onClick,
    onDoubleClick,
    onContextMenu,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onKeyDown,
    onPointerDown,
    ...restProps
  },
  forwardedRef,
) {
  const {
    open,
    trigger,
    disabled,
    triggerRef,
    openDropdown,
    closeDropdown,
    toggleDropdown,
    scheduleOpen,
    scheduleClose,
    cancelScheduled,
    isWithinContent,
  } = useDropdown();

  const resolvedTrigger = triggerOverride ?? trigger;
  const isDisabled = disabled || disabledProp;
  const Tag = as;

  const setNodeRef = (node: HTMLElement | null) => {
    triggerRef.current = node;

    if (!forwardedRef) return;

    if (typeof forwardedRef === "function") {
      forwardedRef(node);
    } else {
      forwardedRef.current = node;
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isDisabled) return;
    if (resolvedTrigger !== "click") return;
    if (!isPlainLeftClick(event)) return;

    toggleDropdown();
  };

  const handleDoubleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isDisabled) return;
    if (resolvedTrigger !== "doubleClick") return;

    event.preventDefault();
    toggleDropdown();
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (isDisabled) return;
    if (resolvedTrigger !== "contextMenu") return;

    event.preventDefault();
    openDropdown();
  };

  const handleMouseEnter = () => {
    if (isDisabled) return;
    if (resolvedTrigger !== "hover") return;

    scheduleOpen();
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    if (isDisabled) return;
    if (resolvedTrigger !== "hover") return;

    const nextTarget = event.relatedTarget as Node | null;

    if (isWithinContent(nextTarget)) {
      return;
    }

    scheduleClose();
  };

  const handleFocus = () => {
    if (isDisabled) return;

    if (resolvedTrigger === "hover") {
      scheduleOpen(0);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (isDisabled) return;

    const nextTarget = event.relatedTarget as Node | null;

    if (isWithinContent(nextTarget)) {
      return;
    }

    if (resolvedTrigger === "hover") {
      scheduleClose(0);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (isDisabled) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeDropdown();
      return;
    }

    if (isKeyboardOpenKey(event)) {
      event.preventDefault();

      if (resolvedTrigger === "hover") {
        openDropdown();
        return;
      }

      toggleDropdown();
    }
  };

  return (
    <Tag
      {...restProps}
      ref={setNodeRef}
      className={cx("inline-flex", className)}
      data-dropdown-interactive="true"
      data-dropdown-state={open ? "open" : "closed"}
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={composeEventHandlers(onClick, handleClick)}
      onDoubleClick={composeEventHandlers(onDoubleClick, handleDoubleClick)}
      onContextMenu={composeEventHandlers(onContextMenu, handleContextMenu)}
      onMouseEnter={composeEventHandlers(onMouseEnter, handleMouseEnter)}
      onMouseLeave={composeEventHandlers(onMouseLeave, handleMouseLeave)}
      onFocus={composeEventHandlers(onFocus, handleFocus)}
      onBlur={composeEventHandlers(onBlur, handleBlur)}
      onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
      onPointerDown={composeEventHandlers(onPointerDown, () => {
        cancelScheduled();
      })}
    >
      {children}
    </Tag>
  );
});

DropdownTrigger.displayName = "DropdownTrigger";
