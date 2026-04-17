import * as React from "react";
import type { PageContainerHeaderProps } from "./page-container.types";
import { cn } from "@/shared/utils/css";
import PageContainerToolbar from "./PageContainerToolbar";

const PageContainerHeader = React.forwardRef<
  HTMLDivElement,
  PageContainerHeaderProps
>(
  (
    {
      className,
      children,
      title,
      description,
      sticky = false,
      withDivider = true,
      toolbar,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "shrink-0 px-6 py-3",
          withDivider && "border-b border-border ",
          sticky &&
            "sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
          className,
        )}
        {...props}
      >
        {children ?? (
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 space-y-1">
              {title ? (
                <h1 className="text-xl font-semibold text-foreground">
                  {title}
                </h1>
              ) : null}

              {description ? (
                <p className="text-sm text-muted-foreground">{description}</p>
              ) : null}
            </div>

            {toolbar ? <PageContainerToolbar {...toolbar} /> : null}
          </div>
        )}
      </div>
    );
  },
);

PageContainerHeader.displayName = "PageContainerHeader";

export default PageContainerHeader;
