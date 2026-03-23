import * as React from "react";
import {
  functionalUpdate,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnOrderState,
  type ColumnPinningState,
  type ColumnSizingState,
  type OnChangeFn,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type Table,
  type Updater,
  type VisibilityState,
} from "@tanstack/react-table";
import type { DataGridProps } from "@/shared/components/data-grid/dataGrid.types";

type UseDataGridTableParams<TData> = {
  props: DataGridProps<TData>;
  resolvedColumns: ColumnDef<TData, unknown>[];
  rowSelection: RowSelectionState;
  sortingState: SortingState;
  columnVisibilityState: VisibilityState;
  columnOrderState: ColumnOrderState;
  columnPinningState: ColumnPinningState;
  columnSizingState: ColumnSizingState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  onSortingChange: OnChangeFn<SortingState>;
  onColumnVisibilityChange: OnChangeFn<VisibilityState>;
  onColumnOrderChange: OnChangeFn<ColumnOrderState>;
  onColumnPinningChange: OnChangeFn<ColumnPinningState>;
  onColumnSizingChange: OnChangeFn<ColumnSizingState>;
};

export function useDataGridTable<TData>({
  props,
  resolvedColumns,
  rowSelection,
  sortingState,
  columnVisibilityState,
  columnOrderState,
  columnPinningState,
  columnSizingState,
  onRowSelectionChange,
  onSortingChange,
  onColumnVisibilityChange,
  onColumnOrderChange,
  onColumnPinningChange,
  onColumnSizingChange,
}: UseDataGridTableParams<TData>): Table<TData> {
  const paginationState = React.useMemo<PaginationState | undefined>(() => {
    if (!props.pagination) return undefined;

    return {
      pageIndex: props.pagination.pageIndex,
      pageSize: props.pagination.pageSize,
    };
  }, [props.pagination]);

  const handlePaginationChange = React.useCallback(
    (updater: Updater<PaginationState>) => {
      if (!props.pagination || !paginationState) return;

      const next = functionalUpdate(updater, paginationState);
      props.pagination.onChange(next.pageIndex, next.pageSize);
    },
    [paginationState, props.pagination],
  );

  const defaultColumn = React.useMemo<Partial<ColumnDef<TData, unknown>>>(
    () => ({
      enableSorting: false,
    }),
    [],
  );

  return useReactTable({
    data: props.data,
    columns: resolvedColumns,
    defaultColumn,
    getRowId: (originalRow, index) => props.rowId(originalRow, index),

    state: {
      rowSelection,
      sorting: sortingState,
      columnVisibility: columnVisibilityState,
      columnOrder: columnOrderState,
      columnPinning: columnPinningState,
      columnSizing: columnSizingState,
      ...(paginationState ? { pagination: paginationState } : {}),
    },

    onRowSelectionChange,
    onSortingChange,
    onColumnVisibilityChange,
    onColumnOrderChange,
    onColumnPinningChange,
    onColumnSizingChange,
    onPaginationChange: handlePaginationChange,

    manualSorting: props.manualSorting,
    manualPagination: props.pagination?.mode === "server",
    rowCount:
      props.pagination?.mode === "server"
        ? (props.pagination.total ?? props.data.length)
        : undefined,

    enableRowSelection: props.selectable,
    enableMultiRowSelection: props.multiSelect,
    columnResizeMode: props.columnResizeMode ?? "onChange",

    getCoreRowModel: getCoreRowModel(),
    ...(props.pagination?.mode !== "server" && props.pagination
      ? { getPaginationRowModel: getPaginationRowModel() }
      : {}),
  });
}
