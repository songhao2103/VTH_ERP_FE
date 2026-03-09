import { SVG_ICONS } from "@/icons/constant";
import type { ISvgIconProps } from "@/icons/type";
import clsx from "clsx";
import React from "react";

const SvgIcon = React.forwardRef<SVGSVGElement, ISvgIconProps>(
  ({ size = 20, icon, className, ...props }, ref) => {
    const config = SVG_ICONS[icon];

    if (!config) return null;

    const { d, class: classCof } = config;

    console.log(classCof);
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
        <path d={d} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-circle-user-round-icon lucide-circle-user-round"
        >
          <path d="M18 20a6 6 0 0 0-12 0" />
          <circle cx="12" cy="10" r="4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      </svg>
    );
  },
);

SvgIcon.displayName = "SvgIcon";

export default SvgIcon;
