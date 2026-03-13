import type { IMenuIconProps } from "@/components/menu/type";
import SvgIcon from "@/icons/SvgIcon";
import clsx from "clsx";

const MenuIcon: React.FC<IMenuIconProps> = ({
  icon,
  fallback,
  active = false,
  className,
}) => {
  return (
    <div
      className={clsx(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold transition-colors",
        active
          ? "border-primary/40 bg-primary/15 text-primary"
          : "border-transparent bg-white/5 text-current",
        className,
      )}
    >
      {icon ? <SvgIcon icon={icon} /> : <span>{fallback?.slice(0, 1)}</span>}
    </div>
  );
};

export default MenuIcon;
