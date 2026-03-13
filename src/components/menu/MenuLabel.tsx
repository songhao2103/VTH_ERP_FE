import type { IMenuLabelProps } from "@/components/menu/type";
import clsx from "clsx";

const MenuLabel: React.FC<IMenuLabelProps> = ({ title, className }) => {
  return <span className={clsx("truncate", className)}>{title}</span>;
};

export default MenuLabel;
