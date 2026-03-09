import type { IMenuLabelProps } from "@/components/menu/type";
import clsx from "clsx";

const MenuLabel: React.FC<IMenuLabelProps> = ({
  title,
  className,
  isBlank,
  path,
  handleClick,
}) => {
  if (isBlank) {
    return (
      <a href={path} target="_blank" rel="noopener" className={clsx(className)}>
        {title}
      </a>
    );
  }
  return <div className={clsx(className)}>{title}</div>;
};

export default MenuLabel;
