import React from "react";
import type { PopperPosition } from "@/shared/components/popper/popper.type";
import {
  buildPlacement,
  getOppositeSide,
  getPlacementAlign,
  getPlacementSide,
} from "@/shared/components/popper/popper.utils";

type UseControllableStateParams<T> = {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
};

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateParams<T>) {
  const [internalValue, setInternalValue] = React.useState<T>(defaultValue);

  const isControlled = value !== undefined;
  const state = isControlled ? value : internalValue;

  const setState = React.useCallback(
    (nextValue: T) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [isControlled, onChange],
  );

  return [state, setState] as const;
}

type UseClickAwayParams = {
  enabled: boolean;
  refs: Array<React.RefObject<HTMLElement | null>>;
  onAway: () => void;
};

export function useClickAway({ enabled, refs, onAway }: UseClickAwayParams) {
  React.useEffect(() => {
    if (!enabled) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      const isInsideSomewhere = refs.some((ref) => {
        const node = ref.current;
        return node ? node.contains(target) : false;
      });

      if (!isInsideSomewhere) {
        onAway();
      }
    };

    document.addEventListener("mousedown", handlePointerDown, true);
    document.addEventListener("touchstart", handlePointerDown, true);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown, true);
      document.removeEventListener("touchstart", handlePointerDown, true);
    };
  }, [enabled, onAway, refs]);
}

type UseEscapeKeyParams = {
  enabled: boolean;
  onEscape: () => void;
};

export function useEscapeKey({ enabled, onEscape }: UseEscapeKeyParams) {
  React.useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscape();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, onEscape]);
}

type UsePopperPositionParams = {
  open: boolean;
  placement: PopperPosition;
  offset: number;
  viewportPadding: number;
  matchTriggerWidth: boolean;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
};

type PopperCoordinates = {
  top: number;
  left: number;
  width?: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function usePopperPosition({
  open,
  placement,
  offset,
  viewportPadding,
  matchTriggerWidth,
  triggerRef,
  contentRef,
}: UsePopperPositionParams) {
  const [resolvedPlacement, setResolvedPlacement] =
    React.useState<PopperPosition>(placement);

  const [coordinates, setCoordinates] = React.useState<PopperCoordinates>({
    top: 0,
    left: 0,
  });

  const updatePosition = React.useCallback(() => {
    const triggerEl = triggerRef.current;
    const contentEl = contentRef.current;

    if (!triggerEl || !contentEl) return;

    if (matchTriggerWidth) {
      contentEl.style.width = `${triggerEl.offsetWidth}px`;
    } else {
      contentEl.style.removeProperty("width");
    }

    const triggerRect = triggerEl.getBoundingClientRect();
    const contentRect = contentEl.getBoundingClientRect();

    const preferredSide = getPlacementSide(placement);
    const align = getPlacementAlign(placement);

    const space = {
      top: triggerRect.top - viewportPadding,
      bottom: window.innerHeight - triggerRect.bottom - viewportPadding,
      left: triggerRect.left - viewportPadding,
      right: window.innerWidth - triggerRect.right - viewportPadding,
    };

    let finalSide = preferredSide;

    if (
      preferredSide === "bottom" &&
      contentRect.height > space.bottom &&
      space.top > space.bottom
    ) {
      finalSide = "top";
    }

    if (
      preferredSide === "top" &&
      contentRect.height > space.top &&
      space.bottom > space.top
    ) {
      finalSide = "bottom";
    }

    if (
      preferredSide === "right" &&
      contentRect.width > space.right &&
      space.left > space.right
    ) {
      finalSide = "left";
    }

    if (
      preferredSide === "left" &&
      contentRect.width > space.left &&
      space.right > space.left
    ) {
      finalSide = "right";
    }

    if (
      finalSide !== preferredSide &&
      ((finalSide === "top" && contentRect.height > space.top) ||
        (finalSide === "bottom" && contentRect.height > space.bottom) ||
        (finalSide === "left" && contentRect.width > space.left) ||
        (finalSide === "right" && contentRect.width > space.right))
    ) {
      finalSide = getOppositeSide(finalSide);
    }

    const nextPlacement = buildPlacement(finalSide, align);

    let top = 0;
    let left = 0;

    if (finalSide === "bottom") {
      top = triggerRect.bottom + offset;

      if (align === "start") left = triggerRect.left;
      else if (align === "end") left = triggerRect.right - contentRect.width;
      else
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
    }

    if (finalSide === "top") {
      top = triggerRect.top - contentRect.height - offset;

      if (align === "start") left = triggerRect.left;
      else if (align === "end") left = triggerRect.right - contentRect.width;
      else
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
    }

    if (finalSide === "right") {
      left = triggerRect.right + offset;

      if (align === "start") top = triggerRect.top;
      else if (align === "end") top = triggerRect.bottom - contentRect.height;
      else
        top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
    }

    if (finalSide === "left") {
      left = triggerRect.left - contentRect.width - offset;

      if (align === "start") top = triggerRect.top;
      else if (align === "end") top = triggerRect.bottom - contentRect.height;
      else
        top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
    }

    const clampedTop = clamp(
      top,
      viewportPadding,
      window.innerHeight - contentRect.height - viewportPadding,
    );

    const clampedLeft = clamp(
      left,
      viewportPadding,
      window.innerWidth - contentRect.width - viewportPadding,
    );

    setResolvedPlacement(nextPlacement);
    setCoordinates({
      top: clampedTop + window.scrollY,
      left: clampedLeft + window.scrollX,
      width: matchTriggerWidth ? triggerRect.width : undefined,
    });
  }, [
    contentRef,
    matchTriggerWidth,
    offset,
    placement,
    triggerRef,
    viewportPadding,
  ]);

  React.useLayoutEffect(() => {
    if (!open) return;

    let frame = 0;

    const run = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updatePosition);
    };

    run();

    window.addEventListener("resize", run);
    window.addEventListener("scroll", run, true);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", run);
      window.removeEventListener("scroll", run, true);
    };
  }, [open, updatePosition]);

  React.useEffect(() => {
    if (!open) {
      setResolvedPlacement(placement);
    }
  }, [open, placement]);

  return {
    resolvedPlacement,
    contentStyle: {
      position: "absolute" as const,
      top: coordinates.top,
      left: coordinates.left,
      width: coordinates.width,
    },
    updatePosition,
  };
}
