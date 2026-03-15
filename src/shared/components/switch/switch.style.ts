import type {
  SwitchColor,
  SwitchSize,
} from "@/shared/components/switch/switch.types";
import clsx from "clsx";

type SizeConfig = {
  track: string;
  thumb: string;
  thumbSize: number;
  x: number;
  icon: string;
  padding: number;
};

export const SWITCH_SIZE_STYLES: Record<SwitchSize, SizeConfig> = {
  sm: {
    track: "h-5 w-9 px-0.5",
    thumb: "h-4 w-4",
    thumbSize: 16,
    x: 16,
    icon: "h-3 w-3",
    padding: 2,
  },
  md: {
    track: "h-6 w-11 px-0.5",
    thumb: "h-5 w-5",
    thumbSize: 20,
    x: 20,
    icon: "h-3.5 w-3.5",
    padding: 2,
  },
  lg: {
    track: "h-7 w-14 px-0.5",
    thumb: "h-6 w-6",
    thumbSize: 24,
    x: 28,
    icon: "h-4 w-4",
    padding: 2,
  },
};

export const SWITCH_COLOR_STYLES: Record<SwitchColor, string> = {
  primary: "data-[state=checked]:bg-primary",
  secondary: "data-[state=checked]:bg-secondary",
  success: "data-[state=checked]:bg-emerald-500",
  warning: "data-[state=checked]:bg-amber-500",
  danger: "data-[state=checked]:bg-red-500",
};

export function getSwitchRootClassName(
  size: SwitchSize,
  color: SwitchColor,
  disabled?: boolean,
  className?: string,
) {
  return clsx(
    "group/switch relative inline-flex shrink-0 items-center rounded-full",
    "border border-transparent",
    "bg-neutral-300 dark:bg-neutral-700",
    "transition-colors duration-200 ease-out",
    "select-none outline-none",
    "focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
    "focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950",
    "data-[state=checked]:border-transparent",
    SWITCH_SIZE_STYLES[size].track,
    SWITCH_COLOR_STYLES[color],
    disabled && "cursor-not-allowed opacity-50",
    !disabled && "cursor-pointer",
    className,
  );
}

export function getThumbClassName(size: SwitchSize) {
  return clsx(
    "absolute left-0 top-1/2 -translate-y-1/2 rounded-full",
    "bg-white shadow-sm ring-1 ring-black/5",
    "will-change-transform",
    SWITCH_SIZE_STYLES[size].thumb,
  );
}

export function getIconSlotClassName(
  position: "start" | "end",
  size: SwitchSize,
) {
  return clsx(
    "pointer-events-none absolute top-1/2 z-[1] -translate-y-1/2",
    "flex items-center justify-center text-white/95",
    SWITCH_SIZE_STYLES[size].icon,
    position === "start" ? "left-1" : "right-1",
  );
}
