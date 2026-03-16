import type {
  ButtonAction,
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from "./button.types";

export const BUTTON_ACTIONS: ButtonAction[] = [
  "submit",
  "approve",
  "reject",
  "close",
  "open",
  "add",
  "edit",
  "delete",
  "save",
  "cancel",
  "search",
  "refresh",
  "download",
  "upload",
];

export const BUTTON_VARIANTS: ButtonVariant[] = [
  "solid",
  "outline",
  "ghost",
  "soft",
];

export const BUTTON_SIZES: ButtonSize[] = ["xs", "sm", "md", "lg", "xl"];

export const BUTTON_DEFAULTS = {
  variant: "solid" as const,
  size: "md" as const,
  color: "primary" as const,
  iconPosition: "left" as const,
  fullWidth: false,
  loading: false,
};

export const BUTTON_ACTION_LABELS: Record<ButtonAction, string> = {
  submit: "Submit",
  approve: "Approve",
  reject: "Reject",
  close: "Close",
  open: "Open",
  add: "Add",
  edit: "Edit",
  delete: "Delete",
  save: "Save",
  cancel: "Cancel",
  search: "Search",
  refresh: "Refresh",
  download: "Download",
  upload: "Upload",
};

export const BUTTON_ACTION_COLORS: Record<ButtonAction, ButtonColor> = {
  submit: "primary",
  approve: "success",
  reject: "danger",
  close: "gray",
  open: "secondary",
  add: "primary",
  edit: "secondary",
  delete: "danger",
  save: "success",
  cancel: "gray",
  search: "primary",
  refresh: "secondary",
  download: "primary",
  upload: "primary",
};
