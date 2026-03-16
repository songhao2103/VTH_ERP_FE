import { clsx } from "clsx";
import type { InputColor, InputSize, InputVariant } from "./input.types";

type StyleParams = {
  variant: InputVariant;
  size: InputSize;
  color: InputColor;
  disabled?: boolean;
  error?: boolean;
  hasStartIcon?: boolean;
  hasEndIcon?: boolean;
  clearable?: boolean;
};

const sizeStyles: Record<
  InputSize,
  { wrapper: string; input: string; icon: string }
> = {
  sm: {
    wrapper: "min-h-9 rounded-lg px-3 gap-2",
    input: "text-sm",
    icon: "size-4",
  },
  md: {
    wrapper: "min-h-11 rounded-xl px-3.5 gap-2",
    input: "text-sm",
    icon: "size-4.5",
  },
  lg: {
    wrapper: "min-h-13 rounded-2xl px-4 gap-2.5",
    input: "text-base",
    icon: "size-5",
  },
};

const colorTokens: Record<
  Exclude<InputColor, "default">,
  {
    outlined: string;
    filled: string;
    standard: string;
    focusRing: string;
    caret: string;
  }
> = {
  primary: {
    outlined: "focus-within:border-blue-600 dark:focus-within:border-blue-400",
    filled: "focus-within:border-blue-600 dark:focus-within:border-blue-400",
    standard: "focus-within:border-blue-600 dark:focus-within:border-blue-400",
    focusRing:
      "focus-within:ring-blue-500/20 dark:focus-within:ring-blue-400/20",
    caret: "caret-blue-600 dark:caret-blue-400",
  },
  success: {
    outlined:
      "focus-within:border-emerald-600 dark:focus-within:border-emerald-400",
    filled:
      "focus-within:border-emerald-600 dark:focus-within:border-emerald-400",
    standard:
      "focus-within:border-emerald-600 dark:focus-within:border-emerald-400",
    focusRing:
      "focus-within:ring-emerald-500/20 dark:focus-within:ring-emerald-400/20",
    caret: "caret-emerald-600 dark:caret-emerald-400",
  },
  warning: {
    outlined:
      "focus-within:border-amber-600 dark:focus-within:border-amber-400",
    filled: "focus-within:border-amber-600 dark:focus-within:border-amber-400",
    standard:
      "focus-within:border-amber-600 dark:focus-within:border-amber-400",
    focusRing:
      "focus-within:ring-amber-500/20 dark:focus-within:ring-amber-400/20",
    caret: "caret-amber-600 dark:caret-amber-400",
  },
  danger: {
    outlined: "focus-within:border-red-600 dark:focus-within:border-red-400",
    filled: "focus-within:border-red-600 dark:focus-within:border-red-400",
    standard: "focus-within:border-red-600 dark:focus-within:border-red-400",
    focusRing: "focus-within:ring-red-500/20 dark:focus-within:ring-red-400/20",
    caret: "caret-red-600 dark:caret-red-400",
  },
};

const defaultColorTokens = {
  outlined: "focus-within:border-slate-950 dark:focus-within:border-white",
  filled: "focus-within:border-slate-950 dark:focus-within:border-white",
  standard: "focus-within:border-slate-950 dark:focus-within:border-white",
  focusRing: "focus-within:ring-slate-950/10 dark:focus-within:ring-white/10",
  caret: "caret-slate-900 dark:caret-slate-100",
};

function resolveColorTokens(color: InputColor) {
  if (color === "default") return defaultColorTokens;
  return colorTokens[color];
}

export function getWrapperClasses({
  variant,
  size,
  color,
  disabled,
  error,
}: StyleParams) {
  const resolved = resolveColorTokens(color);

  const base =
    "group relative flex w-full items-center border transition-all duration-200 ease-out ring-0 outline-none " +
    "focus-within:ring-4 motion-safe:focus-within:scale-[1.002]";

  const variants: Record<InputVariant, string> = {
    outlined:
      "bg-white border-slate-300 dark:bg-slate-950 dark:border-slate-800",
    filled:
      "bg-slate-100 border-slate-100 dark:bg-slate-900 dark:border-slate-900",
    standard:
      "bg-transparent border-x-0 border-t-0 rounded-none px-0 border-b border-slate-300 dark:border-slate-700",
  };

  const state = error
    ? "border-red-600 dark:border-red-400 focus-within:border-red-600 dark:focus-within:border-red-400 focus-within:ring-red-500/20 dark:focus-within:ring-red-400/20"
    : `${resolved[variant]} ${resolved.focusRing}`;

  const disabledState = disabled
    ? "cursor-not-allowed opacity-60 bg-slate-100 dark:bg-slate-900/70"
    : "";

  return clsx(
    base,
    variants[variant],
    sizeStyles[size].wrapper,
    state,
    disabledState,
  );
}

export function getInputClasses({
  size,
  color,
  disabled,
  hasStartIcon,
  hasEndIcon,
  clearable,
}: StyleParams) {
  const resolved = resolveColorTokens(color);

  return clsx(
    "peer block w-full min-w-0 flex-1 bg-transparent outline-none border-0 shadow-none",
    "placeholder:text-slate-400 dark:placeholder:text-slate-500",
    "text-slate-900 dark:text-slate-100",
    "disabled:cursor-not-allowed",
    "autofill:bg-transparent",
    "[&::-ms-reveal]:hidden [&::-ms-clear]:hidden",
    resolved.caret,
    sizeStyles[size].input,
    disabled && "cursor-not-allowed",
    hasStartIcon && "pl-0",
    (hasEndIcon || clearable) && "pr-0",
  );
}

export function getLabelClasses({
  disabled,
  error,
}: Pick<StyleParams, "disabled" | "error">) {
  return clsx(
    "mb-1.5 inline-flex items-center gap-1 text-sm font-medium transition-colors",
    disabled ? "text-gray-400 " : error ? "text-red-600" : "text-gray-700",
  );
}

export function getHelperTextClasses({
  disabled,
  error,
}: Pick<StyleParams, "disabled" | "error">) {
  return clsx(
    "mt-1.5 text-xs leading-5 transition-colors",
    disabled
      ? "text-slate-400 dark:text-slate-500"
      : error
        ? "text-red-600 dark:text-red-400"
        : "text-slate-500 dark:text-slate-400",
  );
}

export function getIconClasses(size: InputSize, disabled?: boolean) {
  return clsx(
    "shrink-0 text-slate-400 transition-colors group-focus-within:text-slate-600 dark:text-slate-500 dark:group-focus-within:text-slate-300",
    sizeStyles[size].icon,
    disabled && "text-slate-300 dark:text-slate-600",
  );
}

export function getClearButtonClasses(size: InputSize) {
  return clsx(
    "inline-flex items-center justify-center rounded-md text-slate-400 transition-all duration-200",
    "hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-200 dark:hover:bg-slate-800",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:focus-visible:ring-slate-500/40",
    size === "sm" && "size-6",
    size === "md" && "size-7",
    size === "lg" && "size-8",
  );
}
