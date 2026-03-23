import * as React from "react";
import type { RowSelectionState, Updater } from "@tanstack/react-table";
import { functionalUpdate } from "@tanstack/react-table";
import { normalizeRowSelection } from "../utils/selection";
import { useControllableState } from "./useControllableState";

export function useDataGridSelection({
  multiSelect,
  selectedRowIds,
  defaultSelectedRowIds,
  onSelectedRowIdsChange,
}: {
  multiSelect: boolean;
  selectedRowIds?: RowSelectionState;
  defaultSelectedRowIds?: RowSelectionState;
  onSelectedRowIdsChange?: (ids: RowSelectionState) => void;
}) {
  const [rowSelection, setRowSelectionRaw] =
    useControllableState<RowSelectionState>({
      value: selectedRowIds,
      defaultValue: normalizeRowSelection(defaultSelectedRowIds),
      onChange: (next) => onSelectedRowIdsChange?.(normalizeRowSelection(next)),
    });

  const setSelectedRowIds = React.useCallback(
    (updater: Updater<RowSelectionState>) => {
      setRowSelectionRaw((prev) => {
        const next = normalizeRowSelection(functionalUpdate(updater, prev));

        if (multiSelect) return next;

        const firstSelectedId = Object.keys(next).find((key) => next[key]);
        return firstSelectedId ? { [firstSelectedId]: true } : {};
      });
    },
    [multiSelect, setRowSelectionRaw],
  );

  const toggleRow = React.useCallback(
    (rowId: string, value?: boolean) => {
      setSelectedRowIds((prev) => {
        const nextValue = value ?? !prev[rowId];

        if (!multiSelect) {
          return nextValue ? { [rowId]: true } : {};
        }

        if (!nextValue) {
          const next = { ...prev };
          delete next[rowId];
          return next;
        }

        return {
          ...prev,
          [rowId]: true,
        };
      });
    },
    [multiSelect, setSelectedRowIds],
  );

  const clearSelection = React.useCallback(() => {
    setSelectedRowIds({});
  }, [setSelectedRowIds]);

  return {
    rowSelection,
    setSelectedRowIds,
    toggleRow,
    clearSelection,
  };
}
