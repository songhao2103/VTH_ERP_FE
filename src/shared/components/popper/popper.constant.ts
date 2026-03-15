import type { PopperProps } from "@/shared/components/popper/popper.type";

export const DEFAULT_POPPER_PROPS: Partial<PopperProps> = {
  placement: "bottom-start",
  openDefault: false,
  trigger: "click",
  offset: 8,
  viewportPadding: 8,
  openDelay: 60,
  closeDelay: 90,
  closeOnClickOutside: true,
  closeOnEscape: true,
  matchTriggerWidth: false,
  portal: true,
  disabled: false,
  role: "dialog",
};
