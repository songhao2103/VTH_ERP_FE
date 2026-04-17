import * as React from "react";
import type {
  PageContainerFooterAlign,
  PageContainerFooterProps,
} from "./page-container.types";
import { cn } from "../form/form.utils";

const alignClassMap: Record<PageContainerFooterAlign, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
  between: "justify-between",
};

const PageContainerFooter = React.forwardRef<
  HTMLDivElement,
  PageContainerFooterProps
>(
  (
    {
      className,
      children,
      align = "right",
      sticky = false,
      withDivider = true,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex shrink-0 items-center gap-3 px-6 py-4",
          alignClassMap[align],
          withDivider && "border-t border-border",
          sticky &&
            "sticky bottom-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

PageContainerFooter.displayName = "PageContainerFooter";

export default PageContainerFooter;
