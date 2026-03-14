import { SVG_ICONS } from "@/icons/constant.tsx";
import type { ISvgIconProps } from "@/icons/type";
import clsx from "clsx";
import React from "react";

const SvgIcon = React.forwardRef<SVGSVGElement, ISvgIconProps>(
  ({ size = 20, icon, className, ...props }, ref) => {
    const config = SVG_ICONS[icon];

    if (!config) return null;

    const { children, class: classCof } = config;
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={clsx(classCof, className)}
        {...props}
      >
        {children}
      </svg>
    );
  },
);

SvgIcon.displayName = "SvgIcon";

export default SvgIcon;
