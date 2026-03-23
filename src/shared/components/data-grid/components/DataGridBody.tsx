import * as React from "react";
import type { ColumnSizingState } from "@tanstack/react-table";
import { useDataGridTable } from "../contexts/DataGridTableContext";
import { useDataGridConfig } from "../contexts/DataGridConfigContext";
import { useDataGridSelection } from "../contexts/DataGridSelectionContext";
import { useDataGridVirtualizer } from "../hooks/useDataGridVirtualizer";
import { DataGridRow } from "./DataGridRow";

export function DataGridBody<TData>({
  scrollRef,
  estimatedRowHeight,
  overscan,
  dynamicRowHeight,
  emptyState,
  loadingState,
  columnSizing,
}: {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  estimatedRowHeight: number;
  overscan: number;
  dynamicRowHeight: boolean;
  emptyState?: React.ReactNode;
  loadingState?: React.ReactNode;
  columnSizing?: ColumnSizingState;
}) {
  const table = useDataGridTable<TData>();
  const { loading } = useDataGridConfig<TData>();
  const { selectedRowIds } = useDataGridSelection();
  const rows = table.getRowModel().rows;

  const rowVirtualizer = useDataGridVirtualizer({
    rows,
    scrollElement: scrollRef,
    overscan,
    estimatedRowHeight,
    dynamicRowHeight,
  });

  if (rows.length === 0) {
    return (
      <div className="flex min-h-60 items-center justify-center p-6">
        {loading
          ? (loadingState ?? (
              <div className="text-sm text-gray-500">Loading...</div>
            ))
          : (emptyState ?? (
              <div className="text-sm text-gray-500">No data available.</div>
            ))}
      </div>
    );
  }

  return (
    <div
      role="rowgroup"
      className="relative"
      style={{
        height: rowVirtualizer.getTotalSize(),
        width: table.getTotalSize(),
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const row = rows[virtualRow.index];
        const selected = Boolean(selectedRowIds[row.id]);

        return (
          <DataGridRow
            key={row.id}
            row={row}
            selected={selected}
            virtualRow={virtualRow}
            dynamicRowHeight={dynamicRowHeight}
            measureElement={rowVirtualizer.measureElement}
            columnSizing={columnSizing}
          />
        );
      })}
    </div>
  );
}
