import * as React from "react";
import { cn } from "../form/form.utils";
import type {
  PageContainerElement,
  PageContainerProps,
} from "./page-container.types";
import PageContainerBody from "./PageContainerBody";
import PageContainerFooter from "./PageContainerFooter";
import PageContainerHeader from "./PageContainerHeader";
import PageContainerToolbar from "./PageContainerToolbar";
import Box from "@mui/material/Box";

type PageContainerCompoundComponent = React.ForwardRefExoticComponent<
  PageContainerProps & React.RefAttributes<PageContainerElement>
> & {
  Header: typeof PageContainerHeader;
  Toolbar: typeof PageContainerToolbar;
  Body: typeof PageContainerBody;
  Footer: typeof PageContainerFooter;
};

const PageContainerRoot = React.forwardRef<
  PageContainerElement,
  PageContainerProps
>(
  (
    { className, children, fullHeight = false, centered = false, ...props },
    ref,
  ) => {
    return (
      <Box
        ref={ref}
        className={cn(
          "min-w-0 card mx-2 my-2 p-0",
          fullHeight && "flex h-full min-h-0 flex-col",
          centered && "mx-auto w-full max-w-screen-2xl",
          className,
        )}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

PageContainerRoot.displayName = "PageContainer";

const PageContainer = Object.assign(PageContainerRoot, {
  Header: PageContainerHeader,
  Toolbar: PageContainerToolbar,
  Body: PageContainerBody,
  Footer: PageContainerFooter,
}) as PageContainerCompoundComponent;

export default PageContainer;
