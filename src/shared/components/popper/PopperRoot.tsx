import { PopperContextProvider } from "@/shared/components/popper/popper.context";
import {
  useClickAway,
  useControllableState,
  useEscapeKey,
  usePopperPosition,
} from "@/shared/components/popper/popper.hooks";
import type {
  ContentInteractionProps,
  PopperProps,
  PopperTriggerMode,
  TriggerInteractionProps,
} from "@/shared/components/popper/popper.type";
import { composeEventHandlers } from "@/shared/components/popper/popper.utils";
import React from "react";

const PopperRoot: React.FC<PopperProps> = ({
  children,
  open,
  defaultOpen,
  openDefault,
  onOpenChange,
  trigger = "click",
  placement,
  position,
  offset = 8,
  viewportPadding = 8,
  openDelay = 60,
  closeDelay = 90,
  closeOnClickOutside = true,
  closeOnEscape = true,
  matchTriggerWidth = false,
  portal = true,
  disabled = false,
  role = "dialog",
}) => {
  const resolvedInitialOpen = defaultOpen ?? openDefault ?? false;
  const resolvedPlacement = placement ?? position ?? "bottom-start";

  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: resolvedInitialOpen,
    onChange: onOpenChange,
  });

  const triggerRef = React.useRef<HTMLElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const contentId = React.useId();

  const timersRef = React.useRef<{
    openTimer?: number;
    closeTimer?: number;
  }>({});

  const clearTimers = React.useCallback(() => {
    if (timersRef.current.openTimer)
      window.clearTimeout(timersRef.current.openTimer);
    if (timersRef.current.closeTimer)
      window.clearTimeout(timersRef.current.closeTimer);
    timersRef.current.openTimer = undefined;
    timersRef.current.closeTimer = undefined;
  }, []);

  const handleOpen = React.useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
  }, [disabled, setIsOpen]);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleToggle = React.useCallback(() => {
    if (disabled) return;
    setIsOpen(!isOpen);
  }, [disabled, isOpen, setIsOpen]);

  const scheduleOpen = React.useCallback(() => {
    if (disabled) return;
    clearTimers();
    timersRef.current.openTimer = window.setTimeout(() => {
      setIsOpen(true);
    }, openDelay);
  }, [clearTimers, disabled, openDelay, setIsOpen]);

  const scheduleClose = React.useCallback(() => {
    clearTimers();
    timersRef.current.closeTimer = window.setTimeout(() => {
      setIsOpen(false);
    }, closeDelay);
  }, [clearTimers, closeDelay, setIsOpen]);

  React.useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  useClickAway({
    enabled: isOpen && closeOnClickOutside,
    refs: [triggerRef, contentRef],
    onAway: handleClose,
  });

  useEscapeKey({
    enabled: isOpen && closeOnEscape,
    onEscape: handleClose,
  });

  const { resolvedPlacement: computedPlacement, contentStyle } =
    usePopperPosition({
      open: isOpen,
      placement: resolvedPlacement,
      offset,
      viewportPadding,
      matchTriggerWidth,
      triggerRef,
      contentRef,
    });
  const getTriggerProps = React.useCallback(
    (props: TriggerInteractionProps = {}): TriggerInteractionProps => {
      const nextProps: TriggerInteractionProps = {
        ...props,
        "aria-expanded": isOpen,
        "aria-controls": contentId,
        // "aria-haspopup": role,
        "data-state": isOpen ? "open" : "closed",
        "data-disabled": disabled ? "" : undefined,
      };

      if (trigger === "click") {
        nextProps.onClick = composeEventHandlers(props.onClick, () => {
          handleToggle();
        });
      }

      if (trigger === "hover") {
        nextProps.onMouseEnter = composeEventHandlers(
          props.onMouseEnter,
          () => {
            scheduleOpen();
          },
        );

        nextProps.onMouseLeave = composeEventHandlers(
          props.onMouseLeave,
          () => {
            scheduleClose();
          },
        );

        nextProps.onFocus = composeEventHandlers(props.onFocus, () => {
          handleOpen();
        });
      }

      if (trigger === "focus") {
        nextProps.onFocus = composeEventHandlers(props.onFocus, () => {
          handleOpen();
        });
      }

      return nextProps;
    },
    [
      contentId,
      disabled,
      handleOpen,
      handleToggle,
      isOpen,
      role,
      scheduleClose,
      scheduleOpen,
      trigger,
    ],
  );

  const getContentProps = React.useCallback(
    (props: ContentInteractionProps = {}): ContentInteractionProps => {
      const nextProps: ContentInteractionProps = {
        ...props,
        id: contentId,
        role,
        "data-state": isOpen ? "open" : "closed",
        "data-placement": computedPlacement,
      };

      if (trigger === "hover") {
        nextProps.onMouseEnter = composeEventHandlers(
          props.onMouseEnter,
          () => {
            clearTimers();
          },
        );

        nextProps.onMouseLeave = composeEventHandlers(
          props.onMouseLeave,
          () => {
            scheduleClose();
          },
        );
      }

      return nextProps;
    },
    [
      clearTimers,
      computedPlacement,
      contentId,
      isOpen,
      role,
      scheduleClose,
      trigger,
    ],
  );
  const contextValue = React.useMemo(
    () => ({
      isOpen,
      open: handleOpen,
      close: handleClose,
      toggle: handleToggle,
      setOpen: setIsOpen,
      triggerMode: trigger as PopperTriggerMode,
      placement: resolvedPlacement,
      resolvedPlacement: computedPlacement,
      triggerRef,
      contentRef,
      contentId,
      contentStyle,
      portal,
      disabled,
      role,
      getTriggerProps,
      getContentProps,
    }),
    [
      computedPlacement,
      contentId,
      contentStyle,
      disabled,
      getContentProps,
      getTriggerProps,
      handleClose,
      handleOpen,
      handleToggle,
      isOpen,
      portal,
      resolvedPlacement,
      role,
      setIsOpen,
      trigger,
    ],
  );

  return (
    <PopperContextProvider value={contextValue}>
      {children}
    </PopperContextProvider>
  );
};

export default PopperRoot;
