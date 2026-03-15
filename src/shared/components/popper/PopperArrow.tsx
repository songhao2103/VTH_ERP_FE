import { usePopperContext } from "@/shared/components/popper/popper.context";
import { cn } from "@/shared/components/popper/popper.utils";
import type { PopperArrowProps } from "@/shared/components/popper/popper.type";
import React from "react";

const PopperArrow: React.FC<PopperArrowProps> = ({ className, size = 10 }) => {
  const { resolvedPlacement } = usePopperContext();

  const side = resolvedPlacement.split("-")[0];
  const align = resolvedPlacement.split("-")[1] ?? "center";

  const base =
    "absolute rotate-45 border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900";

  const style: React.CSSProperties = {
    width: size,
    height: size,
  };

  if (side === "bottom") {
    style.top = -size / 2;
    if (align === "start") style.left = 16;
    else if (align === "end") style.right = 16;
    else style.left = "50%";
  }

  if (side === "top") {
    style.bottom = -size / 2;
    if (align === "start") style.left = 16;
    else if (align === "end") style.right = 16;
    else style.left = "50%";
  }

  if (side === "right") {
    style.left = -size / 2;
    if (align === "start") style.top = 16;
    else if (align === "end") style.bottom = 16;
    else style.top = "50%";
  }

  if (side === "left") {
    style.right = -size / 2;
    if (align === "start") style.top = 16;
    else if (align === "end") style.bottom = 16;
    else style.top = "50%";
  }

  if (align === "center") {
    if (side === "top" || side === "bottom") {
      style.transform = "translateX(-50%) rotate(45deg)";
    } else {
      style.transform = "translateY(-50%) rotate(45deg)";
    }
  }

  return <span aria-hidden style={style} className={cn(base, className)} />;
};

export default PopperArrow;
