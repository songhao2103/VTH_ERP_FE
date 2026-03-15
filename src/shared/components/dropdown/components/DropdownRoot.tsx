import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
} from "react";
import { DropdownRootContext } from "../context/DropdownRootContext";
import { useDropdownManager } from "../context/DropdownContext";
import { isNodeWithinElements } from "../utils/detectOutsideClick";
import type { DropdownRootProps } from "../types/dropdown.types";

const FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const getFocusableTrigger = (node: HTMLElement | null) => {
  if (!node) return null;

  if (node.matches(FOCUSABLE_SELECTOR)) {
    return node;
  }

  return node.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
};

export const DropdownRoot: React.FC<DropdownRootProps> = ({
  id,
  children,
  trigger = "click",
  open,
  defaultOpen = false,
  onOpenChange,
  openDelay = 80,
  closeDelay = 120,
  animationDuration = 0.18,
  placement = "bottom-start",
  offset = 8,
  disabled = false,
  closeOnOutsideClick = true,
  closeOnEscape = true,
}) => {
  const generatedId = useId().replace(/:/g, "");
  const resolvedId = id ?? `dropdown-${generatedId}`;
  const manager = useDropdownManager();
  const parentDropdown = useContext(DropdownRootContext);

  const parentId = parentDropdown?.id ?? null;
  const isControlled = open !== undefined;
  const managedOpen = manager.isOpen(resolvedId);
  const resolvedOpen = isControlled
    ? Boolean(open) && managedOpen
    : managedOpen;

  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const onOpenChangeRef = useRef(onOpenChange);
  // eslint-disable-next-line react-hooks/refs
  onOpenChangeRef.current = onOpenChange;

  const cancelScheduled = useCallback(() => {
    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const focusTrigger = useCallback(() => {
    const nextFocusTarget = getFocusableTrigger(triggerRef.current);
    nextFocusTarget?.focus();
  }, []);

  const openDropdown = useCallback(() => {
    if (disabled) return;

    cancelScheduled();
    manager.requestOpen(resolvedId);
    onOpenChangeRef.current?.(true);
  }, [cancelScheduled, disabled, manager, resolvedId]);

  const closeDropdown = useCallback(() => {
    cancelScheduled();
    manager.requestClose(resolvedId);
    onOpenChangeRef.current?.(false);

    const activeElement = document.activeElement as HTMLElement | null;
    if (activeElement && contentRef.current?.contains(activeElement)) {
      focusTrigger();
    }
  }, [cancelScheduled, focusTrigger, manager, resolvedId]);

  const toggleDropdown = useCallback(() => {
    if (resolvedOpen) {
      closeDropdown();
      return;
    }

    openDropdown();
  }, [closeDropdown, openDropdown, resolvedOpen]);

  const scheduleOpen = useCallback(
    (delay = openDelay) => {
      if (disabled) return;

      cancelScheduled();

      if (delay <= 0) {
        openDropdown();
        return;
      }

      openTimerRef.current = window.setTimeout(() => {
        openDropdown();
      }, delay);
    },
    [cancelScheduled, disabled, openDelay, openDropdown],
  );

  const scheduleClose = useCallback(
    (delay = closeDelay) => {
      cancelScheduled();

      if (delay <= 0) {
        closeDropdown();
        return;
      }

      closeTimerRef.current = window.setTimeout(() => {
        closeDropdown();
      }, delay);
    },
    [cancelScheduled, closeDelay, closeDropdown],
  );

  const isWithinContent = useCallback((node: Node | null) => {
    return isNodeWithinElements(node, [contentRef.current]);
  }, []);

  useEffect(() => {
    manager.registerDropdown(resolvedId, {
      parentId,
      notifyClose: isControlled
        ? () => {
            onOpenChangeRef.current?.(false);
          }
        : undefined,
      getElements: () => [triggerRef.current, contentRef.current],
    });

    return () => {
      manager.unregisterDropdown(resolvedId);
    };
  }, [isControlled, manager, parentId, resolvedId]);

  useEffect(() => {
    if (!isControlled) return;

    if (open) {
      manager.requestOpen(resolvedId);
      return;
    }

    if (manager.isOpen(resolvedId)) {
      manager.requestClose(resolvedId);
    }
  }, [isControlled, manager, open, resolvedId]);

  useEffect(() => {
    if (!isControlled && defaultOpen) {
      manager.requestOpen(resolvedId);
    }
  }, [defaultOpen, isControlled, manager, resolvedId]);

  useEffect(() => {
    return () => {
      cancelScheduled();
    };
  }, [cancelScheduled]);

  const contextValue = useMemo(() => {
    return {
      id: resolvedId,
      parentId,
      open: resolvedOpen,
      trigger,
      placement,
      animationDuration,
      openDelay,
      closeDelay,
      offset,
      disabled,
      closeOnOutsideClick,
      closeOnEscape,
      triggerRef,
      contentRef,
      openDropdown,
      closeDropdown,
      toggleDropdown,
      scheduleOpen,
      scheduleClose,
      cancelScheduled,
      isWithinContent,
    };
  }, [
    animationDuration,
    cancelScheduled,
    closeDelay,
    closeDropdown,
    closeOnEscape,
    closeOnOutsideClick,
    disabled,
    isWithinContent,
    offset,
    openDelay,
    openDropdown,
    parentId,
    placement,
    resolvedId,
    resolvedOpen,
    scheduleClose,
    scheduleOpen,
    toggleDropdown,
    trigger,
  ]);

  return (
    <DropdownRootContext.Provider value={contextValue}>
      {children}
    </DropdownRootContext.Provider>
  );
};
