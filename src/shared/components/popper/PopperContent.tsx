import { usePopperContext } from "@/shared/components/popper/popper.context";
import { cn } from "@/shared/components/popper/popper.utils";
import type {
  PopperAnimation,
  PopperContentProps,
} from "@/shared/components/popper/popper.type";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { createPortal } from "react-dom";

const animationMap: Record<
  PopperAnimation,
  {
    initial: Record<string, number>;
    animate: Record<string, number>;
    exit: Record<string, number>;
  }
> = {
  none: {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 1 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "fade-scale": {
    initial: { opacity: 0, scale: 0.98, y: 6 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.98, y: 6 },
  },
};

const PopperContent = React.forwardRef<HTMLDivElement, PopperContentProps>(
  (
    {
      children,
      className,
      style,
      animation = "fade-scale",
      motionProps,
      ...domProps
    },
    forwardedRef,
  ) => {
    const { isOpen, contentRef, contentStyle, getContentProps, portal } =
      usePopperContext();

    const setContentRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node;

        if (!forwardedRef) return;

        if (typeof forwardedRef === "function") {
          forwardedRef(node);
          return;
        }

        forwardedRef.current = node;
      },
      [contentRef, forwardedRef],
    );

    const variants = animationMap[animation];
    const mergedDomProps = getContentProps(domProps);

    const {
      onDrag,
      onDragStart,
      onDragEnd,
      onAnimationStart,
      ...safeDomProps
    } = mergedDomProps as typeof mergedDomProps & {
      onDrag?: never;
      onDragStart?: never;
      onDragEnd?: never;
      onAnimationStart?: never;
    };

    void onDrag;
    void onDragStart;
    void onDragEnd;
    void onAnimationStart;

    const node = (
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            ref={setContentRef}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ duration: 0.14, ease: "easeOut" }}
            {...safeDomProps}
            {...motionProps}
            style={{
              ...contentStyle,
              ...style,
              zIndex: 50,
            }}
            className={cn(
              "rounded-xl border border-neutral-200 bg-white p-1 shadow-2xl outline-none",
              "dark:border-neutral-800 dark:bg-neutral-900",
              className,
            )}
          >
            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    );

    if (!portal) return node;
    if (typeof document === "undefined") return null;

    return createPortal(node, document.body);
  },
);

PopperContent.displayName = "PopperContent";

export default PopperContent;
