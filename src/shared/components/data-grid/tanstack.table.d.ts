import type {
  CellContext,
  Header,
  RowData,
  Table,
} from "@tanstack/react-table";

export type DataGridMetaCellClassName<
  TData extends RowData,
  TValue = unknown,
> =
  | string
  | ((args: {
      table: Table<TData>;
      row: TData;
      rowIndex: number;
      value: TValue;
      columnId: string;
      cell: CellContext<TData, TValue>;
    }) => string | undefined);

export type DataGridMetaHeaderClassName<
  TData extends RowData,
  TValue = unknown,
> =
  | string
  | ((args: {
      table: Table<TData>;
      columnId: string;
      header: Header<TData, TValue>;
    }) => string | undefined);

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: DataGridMetaCellClassName<TData, TValue>;
    headerClassName?: DataGridMetaHeaderClassName<TData, TValue>;
    footerClassName?: DataGridMetaHeaderClassName<TData, TValue>;

    cellClassName?: DataGridMetaCellClassName<TData, TValue>;
    bodyCellClassName?: DataGridMetaCellClassName<TData, TValue>;

    fit?: boolean;
    grow?: number;
    basisSize?: number;
    minSize?: number;
    maxSize?: number;
    proportional?: boolean;
  }
}
