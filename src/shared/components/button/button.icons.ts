import type { ButtonAction } from "./button.types";
import type { TIconName } from "@/icons/constant";

export const BUTTON_ACTION_ICONS: Record<ButtonAction, TIconName> = {
  submit: "check",
  approve: "checlCheck",
  reject: "circleX",
  close: "x",
  open: "folderOpen",
  add: "plus",
  edit: "pencil",
  delete: "trash2",
  save: "save",
  cancel: "x",
  search: "search",
  refresh: "refreshCw",
  download: "download",
  upload: "upload",
};

// type ButtonSpinnerProps = {
//   className?: string;
// };

// export function ButtonSpinner({ className }: ButtonSpinnerProps) {
//   return <Loader2 aria-hidden="true" className={`animate-spin ${className ?? ""}`} />;
// }
