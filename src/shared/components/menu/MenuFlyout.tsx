import { useMenuContext } from "@/shared/components/menu/constant";
import {
  getItemKey,
  hasChildren,
  isItemActive,
} from "@/shared/components/menu/util";
import MenuIcon from "@/shared/components/menu/MenuIcon";
import type {
  IFlyoutMenuProps,
  IMenuItemConfig,
} from "@/shared/components/menu/type";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";

const GAP = 12;
const SUB_GAP = 8;
const MENU_WIDTH = 256;
const VIEWPORT_PADDING = 8;

const FlyoutRow: React.FC<{
  item: IMenuItemConfig;
  onHover: () => void;
}> = ({ item, onHover }) => {
  const { pathname } = useMenuContext();
  const active = isItemActive(item, pathname);
  const children = hasChildren(item);

  const rowClass = clsx(
    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
    active
      ? "bg-primary/15 text-primary"
      : "text-white hover:bg-secondary/15 hover:text-secondary",
    item.disabled && "cursor-not-allowed opacity-50",
  );

  const content = (
    <>
      <MenuIcon
        icon={item.icon}
        fallback={item.title || "M"}
        active={active}
        className="h-8 w-8"
      />
      <span className="min-w-0 flex-1 truncate">{item.title}</span>

      {item.badge && (
        <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-bold text-secondary">
          {item.badge}
        </span>
      )}

      {children && <span className="text-xs">›</span>}
    </>
  );

  if (children || item.disabled || !item.path) {
    return (
      <button type="button" onMouseEnter={onHover} className={rowClass}>
        {content}
      </button>
    );
  }

  if (item.blank) {
    return (
      <a
        href={item.path}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={onHover}
        className={rowClass}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={item.path} onMouseEnter={onHover} className={rowClass}>
      {content}
    </Link>
  );
};

const FlyoutBranch: React.FC<IFlyoutMenuProps> = ({
  items,
  level = 1,
  anchorRef,
}) => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    const updatePosition = () => {
      const anchor = anchorRef.current;
      if (!anchor) return;

      const rect = anchor.getBoundingClientRect();

      let left = rect.right + (level === 1 ? GAP : SUB_GAP);
      let top = rect.top;

      const maxLeft = window.innerWidth - MENU_WIDTH - VIEWPORT_PADDING;
      if (left > maxLeft) {
        left = Math.max(VIEWPORT_PADDING, maxLeft);
      }

      const maxTop = window.innerHeight - VIEWPORT_PADDING;
      if (top > maxTop) {
        top = maxTop;
      }

      setPosition({ top, left });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [anchorRef, level]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ duration: 0.16 }}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        width: MENU_WIDTH,
      }}
      className="z-[999] rounded-xl border border-zinc-800 bg-black p-2 shadow-2xl"
      onMouseLeave={() => setHoveredKey(null)}
    >
      <div className="relative">
        {items.map((item, index) => {
          if (item.heading) {
            return (
              <div
                key={getItemKey(item, index)}
                className="px-3 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400"
              >
                {item.heading}
              </div>
            );
          }

          if (item.separator) {
            return (
              <div
                key={getItemKey(item, index)}
                className="my-2 border-t border-zinc-800"
              />
            );
          }

          const children = hasChildren(item);
          const currentKey = getItemKey(item, index);
          const childAnchorRef = useRef<HTMLDivElement | null>(null);

          return (
            <div
              key={currentKey}
              ref={childAnchorRef}
              className="relative"
              onMouseEnter={() => setHoveredKey(currentKey)}
            >
              <FlyoutRow
                item={item}
                onHover={() => setHoveredKey(currentKey)}
              />

              <AnimatePresence initial={false}>
                {children && hoveredKey === currentKey && item.children && (
                  <FlyoutMenu
                    items={item.children}
                    level={level + 1}
                    anchorRef={childAnchorRef}
                  />
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

const FlyoutMenu: React.FC<IFlyoutMenuProps> = (props) => {
  if (typeof document === "undefined") return null;
  return createPortal(<FlyoutBranch {...props} />, document.body);
};

export default FlyoutMenu;
