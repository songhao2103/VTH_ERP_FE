import type { PopperPosition } from "@/shared/components/popper/popper.type";
import React from "react";

export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export function mergeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(value);
        return;
      }

      try {
        (ref as React.MutableRefObject<T | null>).current = value;
      } catch {
        // no-op
      }
    });
  };
}

export function composeEventHandlers<E>(
  userHandler?: (event: E) => void,
  internalHandler?: (event: E) => void,
) {
  return (event: E) => {
    userHandler?.(event);
    internalHandler?.(event);
  };
}

export function getPlacementSide(
  placement: PopperPosition,
): "top" | "bottom" | "left" | "right" {
  return placement.split("-")[0] as "top" | "bottom" | "left" | "right";
}

export function getPlacementAlign(
  placement: PopperPosition,
): "start" | "center" | "end" {
  const align = placement.split("-")[1];
  if (align === "start" || align === "end") return align;
  return "center";
}

export function getOppositeSide(
  side: "top" | "bottom" | "left" | "right",
): "top" | "bottom" | "left" | "right" {
  switch (side) {
    case "top":
      return "bottom";
    case "bottom":
      return "top";
    case "left":
      return "right";
    case "right":
      return "left";
  }
}

export function buildPlacement(
  side: "top" | "bottom" | "left" | "right",
  align: "start" | "center" | "end",
): PopperPosition {
  return align === "center"
    ? (side as PopperPosition)
    : (`${side}-${align}` as PopperPosition);
}
