import { clsx } from "clsx";
import type { ButtonColor, ButtonSize, ButtonVariant } from "./button.types";

export const buttonBaseClass = clsx(
  "relative inline-flex shrink-0 select-none items-center justify-center rounded-lg font-medium whitespace-nowrap",
  "transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out",
  "outline-none",
  "focus-visible:ring-2 focus-visible:ring-offset-2",
  "focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400",
  "focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950",
  "disabled:pointer-events-none disabled:opacity-60",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0",
);

export const buttonSizeStyles: Record<
  ButtonSize,
  {
    button: string;
    icon: string;
    spinner: string;
    gap: string;
  }
> = {
  xs: {
    button: "h-7 px-2.5 text-xs",
    icon: "size-3.5",
    spinner: "size-3.5",
    gap: "gap-1",
  },
  sm: {
    button: "h-8 px-3 text-sm",
    icon: "size-4",
    spinner: "size-4",
    gap: "gap-1.5",
  },
  md: {
    button: "h-10 px-4 text-sm",
    icon: "size-4.5",
    spinner: "size-4.5",
    gap: "gap-2",
  },
  lg: {
    button: "h-11 px-5 text-base",
    icon: "size-5",
    spinner: "size-5",
    gap: "gap-2",
  },
  xl: {
    button: "h-12 px-6 text-base",
    icon: "size-5.5",
    spinner: "size-5.5",
    gap: "gap-2.5",
  },
};

const solidColorStyles: Record<ButtonColor, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-400 dark:active:bg-blue-300",
  secondary:
    "bg-violet-600 text-white hover:bg-violet-700 active:bg-violet-800 dark:bg-violet-500 dark:hover:bg-violet-400 dark:active:bg-violet-300",
  success:
    "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:active:bg-emerald-300",
  warning:
    "bg-amber-500 text-neutral-950 hover:bg-amber-600 active:bg-amber-700 dark:bg-amber-400 dark:hover:bg-amber-300 dark:active:bg-amber-200",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 dark:bg-red-500 dark:hover:bg-red-400 dark:active:bg-red-300",
  gray: "bg-neutral-800 text-white hover:bg-neutral-700 active:bg-neutral-600 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:active:bg-neutral-300",
};

const outlineColorStyles: Record<ButtonColor, string> = {
  primary:
    "border border-blue-600 text-blue-700 hover:bg-blue-50 active:bg-blue-100 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-500/10 dark:active:bg-blue-500/20",
  secondary:
    "border border-violet-600 text-violet-700 hover:bg-violet-50 active:bg-violet-100 dark:border-violet-400 dark:text-violet-300 dark:hover:bg-violet-500/10 dark:active:bg-violet-500/20",
  success:
    "border border-emerald-600 text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 dark:border-emerald-400 dark:text-emerald-300 dark:hover:bg-emerald-500/10 dark:active:bg-emerald-500/20",
  warning:
    "border border-amber-500 text-amber-700 hover:bg-amber-50 active:bg-amber-100 dark:border-amber-400 dark:text-amber-300 dark:hover:bg-amber-500/10 dark:active:bg-amber-500/20",
  danger:
    "border border-red-600 text-red-700 hover:bg-red-50 active:bg-red-100 dark:border-red-400 dark:text-red-300 dark:hover:bg-red-500/10 dark:active:bg-red-500/20",
  gray: "border border-neutral-300 text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:active:bg-neutral-700",
};

const ghostColorStyles: Record<ButtonColor, string> = {
  primary:
    "text-blue-700 hover:bg-blue-50 active:bg-blue-100 dark:text-blue-300 dark:hover:bg-blue-500/10 dark:active:bg-blue-500/20",
  secondary:
    "text-violet-700 hover:bg-violet-50 active:bg-violet-100 dark:text-violet-300 dark:hover:bg-violet-500/10 dark:active:bg-violet-500/20",
  success:
    "text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 dark:text-emerald-300 dark:hover:bg-emerald-500/10 dark:active:bg-emerald-500/20",
  warning:
    "text-amber-700 hover:bg-amber-50 active:bg-amber-100 dark:text-amber-300 dark:hover:bg-amber-500/10 dark:active:bg-amber-500/20",
  danger:
    "text-red-700 hover:bg-red-50 active:bg-red-100 dark:text-red-300 dark:hover:bg-red-500/10 dark:active:bg-red-500/20",
  gray: "text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:active:bg-neutral-700",
};

const softColorStyles: Record<ButtonColor, string> = {
  primary:
    "bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-300 dark:bg-blue-500/15 dark:text-blue-300 dark:hover:bg-blue-500/25 dark:active:bg-blue-500/35",
  secondary:
    "bg-violet-100 text-violet-800 hover:bg-violet-200 active:bg-violet-300 dark:bg-violet-500/15 dark:text-violet-300 dark:hover:bg-violet-500/25 dark:active:bg-violet-500/35",
  success:
    "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 active:bg-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-300 dark:hover:bg-emerald-500/25 dark:active:bg-emerald-500/35",
  warning:
    "bg-amber-100 text-amber-800 hover:bg-amber-200 active:bg-amber-300 dark:bg-amber-500/15 dark:text-amber-300 dark:hover:bg-amber-500/25 dark:active:bg-amber-500/35",
  danger:
    "bg-red-100 text-red-800 hover:bg-red-200 active:bg-red-300 dark:bg-red-500/15 dark:text-red-300 dark:hover:bg-red-500/25 dark:active:bg-red-500/35",
  gray: "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 active:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:active:bg-neutral-600",
};

const variantColorMap: Record<ButtonVariant, Record<ButtonColor, string>> = {
  solid: solidColorStyles,
  outline: outlineColorStyles,
  ghost: ghostColorStyles,
  soft: softColorStyles,
};

type GetButtonClassNameParams = {
  variant: ButtonVariant;
  size: ButtonSize;
  color: ButtonColor;
  fullWidth?: boolean;
  className?: string;
};

export function getButtonClassName({
  variant,
  size,
  color,
  fullWidth,
  className,
}: GetButtonClassNameParams) {
  return clsx(
    buttonBaseClass,
    buttonSizeStyles[size].button,
    buttonSizeStyles[size].gap,
    variantColorMap[variant][color],
    fullWidth && "w-full",
    className,
  );
}

export function getButtonIconClassName(size: ButtonSize) {
  return clsx(buttonSizeStyles[size].icon);
}

export function getButtonSpinnerClassName(size: ButtonSize) {
  return clsx(buttonSizeStyles[size].spinner);
}
