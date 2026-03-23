import * as React from "react";
import type { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { DATA_GRID_SELECTION_COLUMN_ID } from "@/shared/components/data-grid/dataGrid.constant";

export function useDataGridColumns<TData>({
  columns,
  selectable,
  multiSelect,
  selectionColumnWidth,
  rowSelection,
  setSelectedRowIds,
  toggleRow,
}: {
  columns: ColumnDef<TData, unknown>[];
  selectable: boolean;
  multiSelect: boolean;
  selectionColumnWidth: number;
  rowSelection: RowSelectionState;
  setSelectedRowIds: (
    updater:
      | RowSelectionState
      | ((prev: RowSelectionState) => RowSelectionState),
  ) => void;
  toggleRow: (rowId: string, value?: boolean) => void;
}) {
  return React.useMemo<ColumnDef<TData, unknown>[]>(() => {
    if (!selectable) return columns;

    const selectionColumn: ColumnDef<TData, unknown> = {
      id: DATA_GRID_SELECTION_COLUMN_ID,
      size: selectionColumnWidth,
      minSize: selectionColumnWidth,
      maxSize: selectionColumnWidth,
      enableSorting: false,
      enableHiding: false,
      enableResizing: false,
      enablePinning: true,
      header: ({ table }) => {
        if (!multiSelect) {
          return <div className="flex items-center justify-center" />;
        }

        const rows = table.getRowModel().rows;
        const allSelected =
          rows.length > 0 && rows.every((row) => Boolean(rowSelection[row.id]));
        const someSelected =
          rows.some((row) => Boolean(rowSelection[row.id])) && !allSelected;

        return (
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              checked={allSelected}
              ref={(node) => {
                if (node) node.indeterminate = someSelected;
              }}
              onChange={() => {
                setSelectedRowIds((prev) => {
                  const rowIds = rows.map((row) => row.id);
                  const shouldSelect = rowIds.some((id) => !prev[id]);

                  if (!shouldSelect) {
                    const next = { ...prev };
                    rowIds.forEach((id) => {
                      delete next[id];
                    });
                    return next;
                  }

                  const next = { ...prev };
                  rowIds.forEach((id) => {
                    next[id] = true;
                  });
                  return next;
                });
              }}
              onClick={(event) => event.stopPropagation()}
              className="h-4 w-4 rounded border border-neutral-300 accent-blue-600"
            />
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <input
            type={multiSelect ? "checkbox" : "radio"}
            checked={Boolean(rowSelection[row.id])}
            onChange={() => toggleRow(row.id)}
            onClick={(event) => event.stopPropagation()}
            className="h-4 w-4 rounded border border-neutral-300 accent-blue-600"
          />
        </div>
      ),
    };

    return [selectionColumn, ...columns];
  }, [
    columns,
    multiSelect,
    rowSelection,
    selectable,
    selectionColumnWidth,
    setSelectedRowIds,
    toggleRow,
  ]);
}
