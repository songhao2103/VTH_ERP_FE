import { useMenuContext } from "@/components/menu/constant";
import { getItemKey, hasChildren, isItemActive } from "@/components/menu/util";
import MenuIcon from "@/components/menu/MenuIcon";
import type { IFlyoutMenuProps, IMenuItemConfig } from "@/components/menu/type";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { Link } from "react-router";

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

const FlyoutMenu: React.FC<IFlyoutMenuProps> = ({ items, level = 1 }) => {
  const [hoveredItem, setHoveredItem] = useState<IMenuItemConfig | null>(null);

  const visibleItems = useMemo(() => items, [items]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ duration: 0.16 }}
      className={clsx(
        "absolute top-0 z-50 min-w-64 rounded-xl border border-zinc-800 bg-black p-2 shadow-2xl",
        level === 1 ? "left-full ml-3" : "left-full ml-2",
      )}
    >
      <div className="relative">
        {visibleItems.map((item, index) => {
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
          const hoveredKey = hoveredItem ? getItemKey(hoveredItem) : null;

          return (
            <div
              key={currentKey}
              className="relative"
              onMouseEnter={() => setHoveredItem(item)}
            >
              <FlyoutRow item={item} onHover={() => setHoveredItem(item)} />

              <AnimatePresence>
                {children && hoveredKey === currentKey && item.children && (
                  <FlyoutMenu items={item.children} level={level + 1} />
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default FlyoutMenu;
