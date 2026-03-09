import type { TIconName } from "@/icons/constant";

export interface ISvgIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  icon: TIconName;
}
