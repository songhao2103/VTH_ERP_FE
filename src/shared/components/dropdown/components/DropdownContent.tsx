import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, type HTMLMotionProps } from "motion/react";
import { createPortal } from "react-dom";
import { useDropdownManager } from "../context/DropdownContext";
import { useDropdown } from "../hooks/useDropdown";
import {
  isEventOutside,
  isNodeWithinElements,
} from "../utils/detectOutsideClick";
import { composeEventHandlers, cx } from "../utils/eventGuards";

type DropdownContentProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: React.ReactNode;
  forceMount?: boolean;
  portal?: boolean;
  placement?: "bottom-start" | "bottom-center" | "bottom-end";
  animationDuration?: number;
  offset?: number;
};

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const getFirstFocusable = (container: HTMLElement | null) => {
  if (!container) return null;
  return container.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
};

type Position = {
  top: number;
  left: number;
};

export const DropdownContent = React.forwardRef<
  HTMLDivElement,
  DropdownContentProps
>(function DropdownContent(
  {
    children,
    className,
    style,
    forceMount = false,
    portal = true,
    placement: placementOverride,
    animationDuration: animationDurationOverride,
    offset: offsetOverride,
    onMouseEnter,
    onMouseLeave,
    onBlur,
    onFocus,
    ...restProps
  },
  forwardedRef,
) {
  const manager = useDropdownManager();
  const {
    id,
    open,
    placement,
    offset,
    animationDuration,
    triggerRef,
    contentRef,
    closeDropdown,
    scheduleClose,
    cancelScheduled,
    closeOnEscape,
    closeOnOutsideClick,
  } = useDropdown();

  const resolvedPlacement = placementOverride ?? placement;
  const resolvedOffset = offsetOverride ?? offset;
  const resolvedDuration = animationDurationOverride ?? animationDuration;

  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const [ready, setReady] = useState(false);

  const previousFocusedElementRef = useRef<HTMLElement | null>(null);

  const shouldRender = forceMount || open;

  useLayoutEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReady(false);
      return;
    }

    const updatePosition = () => {
      const triggerElement = triggerRef.current;
      const contentElement = contentRef.current;

      if (!triggerElement || !contentElement) return;

      const triggerRect = triggerElement.getBoundingClientRect();
      const contentRect = contentElement.getBoundingClientRect();

      const viewportPadding = 8;

      let nextLeft = triggerRect.left;
      const nextTop = triggerRect.bottom + resolvedOffset;

      if (resolvedPlacement === "bottom-center") {
        nextLeft =
          triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
      }

      if (resolvedPlacement === "bottom-end") {
        nextLeft = triggerRect.right - contentRect.width;
      }

      nextLeft = Math.max(
        viewportPadding,
        Math.min(
          nextLeft,
          window.innerWidth - contentRect.width - viewportPadding,
        ),
      );

      setPosition({
        top: nextTop,
        left: nextLeft,
      });

      setReady(true);
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, resolvedOffset, resolvedPlacement, triggerRef, contentRef]);

  useEffect(() => {
    if (!open || !closeOnOutsideClick) return;

    const handlePointerDown = (event: PointerEvent) => {
      const branchElements = manager.getOpenBranchElements(id);

      if (isEventOutside(event, branchElements)) {
        closeDropdown();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, [closeDropdown, closeOnOutsideClick, id, manager, open]);

  useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (manager.activeDropdownId !== id) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeDropdown();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeDropdown, closeOnEscape, id, manager, open]);

  useEffect(() => {
    if (!open) return;

    previousFocusedElementRef.current =
      document.activeElement as HTMLElement | null;

    const timer = window.requestAnimationFrame(() => {
      const focusTarget =
        getFirstFocusable(contentRef.current) ?? contentRef.current;
      focusTarget?.focus();
    });

    return () => {
      window.cancelAnimationFrame(timer);
    };
  }, [open, contentRef]);

  const contentNode = useMemo(() => {
    if (!shouldRender) return null;

    return (
      <AnimatePresence>
        {open ? (
          <motion.div
            {...restProps}
            ref={(node) => {
              contentRef.current = node;
              if (typeof forwardedRef === "function") {
                forwardedRef(node);
              } else if (forwardedRef) {
                forwardedRef.current = node;
              }
            }}
            role="menu"
            tabIndex={-1}
            data-dropdown-interactive="true"
            data-dropdown-state={open ? "open" : "closed"}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: resolvedDuration }}
            className={cx(
              "z-[1000] min-w-48 rounded-xl border border-white/10 bg-neutral-900 p-1 text-white shadow-2xl outline-none backdrop-blur-md",
              className,
            )}
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
              visibility: ready ? "visible" : "hidden",
              ...style,
            }}
            onMouseEnter={composeEventHandlers(onMouseEnter, () => {
              cancelScheduled();
            })}
            onMouseLeave={composeEventHandlers(onMouseLeave, (event) => {
              const nextTarget = event.relatedTarget as Node | null;
              const branchElements = manager.getOpenBranchElements(id);

              if (isNodeWithinElements(nextTarget, branchElements)) return;
              scheduleClose();
            })}
            onFocus={composeEventHandlers(onFocus, () => {
              cancelScheduled();
            })}
            onBlur={composeEventHandlers(onBlur, (event) => {
              const nextTarget = event.relatedTarget as Node | null;
              const branchElements = manager.getOpenBranchElements(id);

              if (isNodeWithinElements(nextTarget, branchElements)) return;
              scheduleClose(0);
            })}
          >
            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    );
  }, [
    shouldRender,
    open,
    restProps,
    contentRef,
    forwardedRef,
    resolvedDuration,
    className,
    style,
    position.top,
    position.left,
    ready,
    onMouseEnter,
    cancelScheduled,
    onMouseLeave,
    manager,
    id,
    scheduleClose,
    onFocus,
    onBlur,
    children,
  ]);

  if (!contentNode) return null;

  return portal ? createPortal(contentNode, document.body) : contentNode;
});
