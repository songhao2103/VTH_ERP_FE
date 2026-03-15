import SvgIcon from "@/icons/SvgIcon";
import clsx from "clsx";

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}
const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  collapsed,
  onToggle,
}) => {
  return (
    <div className="px-4.5 py-4.5 relative">
      <p
        className="font-bold text-title-xl data-[hidden=true]:hidden"
        data-hidden={collapsed}
      >
        VTH ERP
      </p>
      <button
        onClick={onToggle}
        className={clsx(
          "hover-bg-brand-soft",
          "hover-text-brand",
          "hover-border-brand",
          "border",
          "rounded-md",
          "px-3",
          "py-1.5",
          "cursor-pointer",
          "border-gray-800",
          "text-gray-600",
          "absolute",
          "-right-2",
          "bg-gray-900/45",
          "top-4",
        )}
      >
        <SvgIcon
          icon="arrowLeftToLine"
          className={clsx("transition-all", {
            "rotate-0": !collapsed,
            "rotate-180": collapsed,
          })}
          size={16}
        />
      </button>
    </div>
  );
};
export default SidebarHeader;
