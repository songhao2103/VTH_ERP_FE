import { useMenuContext } from "@/components/menu/constant";
import { isItemActive } from "@/components/menu/util";
import MenuArrow from "@/components/menu/MenuArrow";
import MenuIcon from "@/components/menu/MenuIcon";
import MenuLabel from "@/components/menu/MenuLabel";
import type { IMenuItemProps, TMenuTheme } from "@/components/menu/type";
import clsx from "clsx";
import React from "react";
import { Link } from "react-router";

const getItemClasses = (
  theme: TMenuTheme,
  active: boolean,
  disabled?: boolean,
) => {
  return clsx(
    "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
    {
      "cursor-not-allowed opacity-50": disabled,
      "cursor-pointer": !disabled,
      "bg-primary/20 text-primary": theme === "dark" && active,
      "text-white hover:bg-secondary/15 hover:text-secondary":
        theme === "dark" && !active,
      "bg-primary/10 text-primary": theme === "light" && active,
      "text-zinc-800 hover:bg-secondary/10 hover:text-secondary":
        theme === "light" && !active,
    },
  );
};

const MenuItem: React.FC<IMenuItemProps> = ({
  item,
  level,
  hasChildren,
  isOpen,
  theme,
}) => {
  const { toggleAccordion, pathname } = useMenuContext();

  const active = isItemActive(item, pathname);
  const disabled = item.disabled;
  const itemClasses = getItemClasses(theme, active, disabled);
  const fallback = item.title || "M";

  const content = (
    <>
      <MenuIcon icon={item.icon} fallback={fallback} active={active} />
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <MenuLabel
          title={item.title || "Menu"}
          className="min-w-0 flex-1 truncate"
        />
        {item.badge && (
          <span
            className={clsx(
              "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold",
              theme === "dark"
                ? "bg-secondary/15 text-secondary"
                : "bg-primary/10 text-primary",
            )}
          >
            {item.badge}
          </span>
        )}
      </div>
      {hasChildren && <MenuArrow isOpen={isOpen} />}
    </>
  );

  const commonStyle = { paddingLeft: `${12 + level * 12}px` };

  if (hasChildren) {
    return (
      <button
        type="button"
        onClick={() => item.rootPath && toggleAccordion(item.rootPath)}
        disabled={disabled}
        className={itemClasses}
        style={commonStyle}
      >
        {content}
      </button>
    );
  }

  if (disabled || !item.path) {
    return (
      <div className={itemClasses} style={commonStyle}>
        {content}
      </div>
    );
  }

  if (item.blank) {
    return (
      <a
        href={item.path}
        target="_blank"
        rel="noopener noreferrer"
        className={itemClasses}
        style={commonStyle}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={item.path} className={itemClasses} style={commonStyle}>
      {content}
    </Link>
  );
};

export default MenuItem;
