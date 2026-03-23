import type { Cell, Header, RowData, Table } from "@tanstack/react-table";

export function resolveHeaderClassName<TData extends RowData>(
  header: Header<TData, unknown>,
  table: Table<TData>,
) {
  const meta = header.column.columnDef.meta;

  if (!meta?.headerClassName) return undefined;

  return typeof meta.headerClassName === "function"
    ? meta.headerClassName({
        table,
        columnId: header.column.id,
        header,
      })
    : meta.headerClassName;
}

export function resolveFooterClassName<TData extends RowData>(
  header: Header<TData, unknown>,
  table: Table<TData>,
) {
  const meta = header.column.columnDef.meta;

  if (!meta?.footerClassName) return undefined;

  return typeof meta.footerClassName === "function"
    ? meta.footerClassName({
        table,
        columnId: header.column.id,
        header,
      })
    : meta.footerClassName;
}

export function resolveCellClassName<TData extends RowData>(
  cell: Cell<TData, unknown>,
  table: Table<TData>,
) {
  const meta = cell.column.columnDef.meta;
  const row = cell.row.original;
  const value = cell.getValue();

  const resolver =
    meta?.bodyCellClassName ?? meta?.cellClassName ?? meta?.className;

  if (!resolver) return undefined;

  return typeof resolver === "function"
    ? resolver({
        table,
        row,
        rowIndex: cell.row.index,
        value,
        columnId: cell.column.id,
        cell: cell.getContext(),
      })
    : resolver;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getColumnLayoutMeta<TData extends RowData>(column: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columnDef: { meta?: any; size?: number; minSize?: number; maxSize?: number };
}) {
  const meta = column.columnDef.meta;

  return {
    fit: meta?.fit ?? true,
    grow: meta?.grow ?? 1,
    basisSize: meta?.basisSize,
    minSize: meta?.minSize,
    maxSize: meta?.maxSize,
    proportional: meta?.proportional ?? false,
  };
}
