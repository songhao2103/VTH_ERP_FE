import * as React from "react";
import type { PageContainerBodyProps } from "./page-container.types";
import { cn } from "@/shared/utils/css";

const PageContainerBody = React.forwardRef<
  HTMLDivElement,
  PageContainerBodyProps
>(
  (
    { className, children, scrollable = false, padded = true, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "min-w-0 flex-1",
          scrollable && "min-h-0 overflow-auto",
          padded && "px-6 py-6",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

PageContainerBody.displayName = "PageContainerBody";

export default PageContainerBody;
