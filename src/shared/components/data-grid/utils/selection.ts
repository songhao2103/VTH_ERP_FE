import type { RowSelectionState } from "@tanstack/react-table";

export function normalizeRowSelection(
  value: RowSelectionState | undefined,
): RowSelectionState {
  if (!value) return {};

  const next: RowSelectionState = {};
  for (const key of Object.keys(value)) {
    if (value[key]) next[key] = true;
  }

  return next;
}
