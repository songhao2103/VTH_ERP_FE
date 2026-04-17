/* eslint-disable react-hooks/set-state-in-effect */
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";

// material-ui
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import type { SxProps, Theme } from "@mui/material/styles";

// project imports
import DataTablePagination from "./DataTablePagination";
import DataTableSearch from "./DataTableSearch";
import { calculateRowNumber } from "./utils";
import type { DataFiltersProps } from "./DataFilters";
import DataFilters from "./DataFilters";

// ==============================|| REUSABLE DATA TABLE ||============================== //

type Order = "asc" | "desc";
export type BaseRow = Record<string, unknown>;
type ColumnId<T extends BaseRow> = Extract<keyof T, string> | string;

export interface DataTableColumn<T extends BaseRow = BaseRow> {
  id: ColumnId<T>;
  label: string;
  sortable?: boolean;
  searchable?: boolean;
  hidden?: boolean;
  align?: "left" | "center" | "right";
  width?: string | number;
  render?: (value: unknown, row: T, index: number) => ReactNode;
  showRowNumber?: boolean;
}

export interface ActionColumn<T extends BaseRow = BaseRow> {
  label?: string;
  width?: string | number;
  align?: "left" | "center" | "right";
  render: (row: T, index: number) => ReactNode;
}

export interface DataTableProps<T extends BaseRow = BaseRow> {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey?: keyof T | ((row: T) => string | number);
  defaultOrderBy?: string;
  defaultOrder?: Order;
  defaultRowsPerPage?: number;
  rowsPerPageOptions?: number[];
  showPagination?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;

  // search server-side
  externalSearch?: boolean;
  searchTermProp?: string;
  onSearchChangeProp?: (value: string) => void;
  searchColumnProp?: string;
  onSearchColumnChangeProp?: (columnId: string) => void;

  // sort server-side
  externalSort?: boolean;
  orderByProp?: string;
  orderProp?: Order;
  sortMapProp?: Record<string, Order>;
  onSortChange?: (orderBy: string, order: Order) => void;
  onSortMapChange?: (sortMap: Record<string, Order>) => void;

  // pagination server-side
  externalPagination?: boolean;
  pageProp?: number;
  rowsPerPageProp?: number;
  totalProp?: number;
  onPageChangeProp?: (page: number) => void;
  onRowsPerPageChangeProp?: (rowsPerPage: number) => void;

  isLoading?: boolean;
  size?: "small" | "medium";
  sx?: SxProps<Theme>;
  onRowClick?: (row: T, index: number) => void;
  actionColumn?: ActionColumn<T>;

  filters?: DataFiltersProps;
}

const getCellValue = <T extends BaseRow>(row: T, columnId: string): unknown =>
  row[columnId as keyof T];

const compareValues = (a: unknown, b: unknown, order: Order): number => {
  if (a == null && b == null) return 0;
  if (a == null) return order === "asc" ? -1 : 1;
  if (b == null) return order === "asc" ? 1 : -1;

  if (typeof a === "number" && typeof b === "number") {
    return order === "asc" ? a - b : b - a;
  }

  const aString = String(a).toLowerCase();
  const bString = String(b).toLowerCase();

  if (aString < bString) return order === "asc" ? -1 : 1;
  if (aString > bString) return order === "asc" ? 1 : -1;
  return 0;
};

function DataTable<T extends BaseRow>({
  columns,
  data,
  rowKey = "id" as keyof T,
  defaultOrderBy,
  defaultOrder = "asc",
  defaultRowsPerPage = 10,
  rowsPerPageOptions = [10, 20, 50],
  showPagination = true,
  showSearch = true,
  searchPlaceholder = "Tìm kiếm",
  size = "small",
  sx,
  onRowClick,
  actionColumn,
  externalSearch = false,
  searchTermProp,
  onSearchChangeProp,
  searchColumnProp,
  onSearchColumnChangeProp,
  externalSort = false,
  orderByProp,
  orderProp,
  sortMapProp,
  onSortChange,
  onSortMapChange,
  externalPagination = false,
  pageProp,
  rowsPerPageProp,
  totalProp,
  onPageChangeProp,
  onRowsPerPageChangeProp,
  isLoading = false,
  filters,
}: DataTableProps<T>) {
  const searchableColumns = useMemo(
    () => columns.filter((column) => column.searchable !== false),
    [columns],
  );

  const defaultSearchColumn = useMemo(
    () => searchableColumns[0]?.id ?? "",
    [searchableColumns],
  );

  const defaultVisibleColumns = useMemo(
    () => columns.filter((column) => !column.hidden).map((column) => column.id),
    [columns],
  );

  const [localOrder, setLocalOrder] = useState<Order>(
    orderProp ?? defaultOrder,
  );
  const [localOrderBy, setLocalOrderBy] = useState<string>(
    orderByProp ?? defaultOrderBy ?? columns[0]?.id ?? "",
  );
  const [localPage, setLocalPage] = useState<number>(1);
  const [localRowsPerPage, setLocalRowsPerPage] =
    useState<number>(defaultRowsPerPage);
  const [localSearchTerm, setLocalSearchTerm] = useState<string>("");
  const [localSearchColumn, setLocalSearchColumn] =
    useState<string>(defaultSearchColumn);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    defaultVisibleColumns,
  );

  useEffect(() => {
    if (!externalSort) return;

    if (orderByProp !== undefined) {
      setLocalOrderBy(orderByProp);
    }

    if (orderProp !== undefined) {
      setLocalOrder(orderProp);
    }
  }, [externalSort, orderByProp, orderProp]);

  useEffect(() => {
    if (!externalPagination) return;

    if (pageProp !== undefined) {
      setLocalPage(pageProp);
    }

    if (rowsPerPageProp !== undefined) {
      setLocalRowsPerPage(rowsPerPageProp);
    }
  }, [externalPagination, pageProp, rowsPerPageProp]);

  useEffect(() => {
    setLocalSearchColumn((prev) => {
      if (!prev) return defaultSearchColumn;
      const exists = searchableColumns.some((column) => column.id === prev);
      return exists ? prev : defaultSearchColumn;
    });
  }, [defaultSearchColumn, searchableColumns]);

  useEffect(() => {
    setVisibleColumns((prev) => {
      const allowedIds = new Set(columns.map((column) => column.id));
      const nextDefault = columns
        .filter((column) => !column.hidden)
        .map((column) => column.id);

      const preserved = prev.filter((id) => allowedIds.has(id));
      const additions = nextDefault.filter((id) => !preserved.includes(id));

      return [...preserved, ...additions];
    });
  }, [columns]);

  const currentOrder = externalSort ? (orderProp ?? localOrder) : localOrder;
  const currentOrderBy = externalSort
    ? (orderByProp ?? localOrderBy)
    : localOrderBy;

  const currentPage = externalPagination ? (pageProp ?? localPage) : localPage;

  const currentRowsPerPage = externalPagination
    ? (rowsPerPageProp ?? localRowsPerPage)
    : localRowsPerPage;

  const searchTerm = externalSearch ? (searchTermProp ?? "") : localSearchTerm;

  const searchColumn = externalSearch
    ? (searchColumnProp ?? localSearchColumn)
    : localSearchColumn;

  const handleRequestSort = useCallback(
    (property: string) => {
      if (externalSort) {
        if (onSortMapChange) {
          const currentSortMap = sortMapProp ?? {};
          const currentColumnOrder = currentSortMap[property];
          const nextSortMap = { ...currentSortMap };

          if (currentColumnOrder === "asc") {
            nextSortMap[property] = "desc";
          } else if (currentColumnOrder === "desc") {
            delete nextSortMap[property];
          } else {
            nextSortMap[property] = "asc";
          }

          onSortMapChange(nextSortMap);
          return;
        }

        if (onSortChange) {
          const isAsc = currentOrderBy === property && currentOrder === "asc";
          onSortChange(property, isAsc ? "desc" : "asc");
        }
        return;
      }

      const isAsc = currentOrderBy === property && currentOrder === "asc";
      setLocalOrder(isAsc ? "desc" : "asc");
      setLocalOrderBy(property);
    },
    [
      currentOrder,
      currentOrderBy,
      externalSort,
      onSortChange,
      onSortMapChange,
      sortMapProp,
    ],
  );

  const handleChangePage = (_event: ChangeEvent<unknown>, newPage: number) => {
    if (externalPagination) {
      onPageChangeProp?.(newPage);
      return;
    }

    setLocalPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const nextRowsPerPage = Number.parseInt(event.target.value, 10);

    if (externalPagination) {
      onRowsPerPageChangeProp?.(nextRowsPerPage);
      onPageChangeProp?.(1);
      return;
    }

    setLocalRowsPerPage(nextRowsPerPage);
    setLocalPage(1);
  };

  const filteredRows = useMemo(() => {
    if (externalSearch) return data;
    if (!searchTerm || !searchColumn) return data;

    const normalizedKeyword = searchTerm.toLowerCase();

    return data.filter((row) => {
      const value = getCellValue(row, searchColumn);
      if (value == null) return false;

      return String(value).toLowerCase().includes(normalizedKeyword);
    });
  }, [data, externalSearch, searchColumn, searchTerm]);

  const sortedRows = useMemo(() => {
    if (externalSort || !currentOrderBy) return filteredRows;

    return [...filteredRows].sort((rowA, rowB) =>
      compareValues(
        getCellValue(rowA, currentOrderBy),
        getCellValue(rowB, currentOrderBy),
        currentOrder,
      ),
    );
  }, [currentOrder, currentOrderBy, externalSort, filteredRows]);

  const paginatedRows = useMemo(() => {
    if (!showPagination || externalPagination) return sortedRows;

    const start = (currentPage - 1) * currentRowsPerPage;
    return sortedRows.slice(start, start + currentRowsPerPage);
  }, [
    currentPage,
    currentRowsPerPage,
    externalPagination,
    showPagination,
    sortedRows,
  ]);

  const total = externalPagination
    ? (totalProp ?? data.length)
    : filteredRows.length;

  const pageCount = Math.max(1, Math.ceil(total / currentRowsPerPage) || 1);
  const startIndex = total > 0 ? (currentPage - 1) * currentRowsPerPage + 1 : 0;
  const endIndex = Math.min(currentPage * currentRowsPerPage, total);

  const handlePrevPage = () => {
    const nextPage = Math.max(currentPage - 1, 1);

    if (externalPagination) {
      onPageChangeProp?.(nextPage);
      return;
    }

    setLocalPage(nextPage);
  };

  const handleNextPage = () => {
    const nextPage = Math.min(currentPage + 1, pageCount);

    if (externalPagination) {
      onPageChangeProp?.(nextPage);
      return;
    }

    setLocalPage(nextPage);
  };

  const handleSearchChange = (value: string) => {
    if (!externalSearch) {
      setLocalSearchTerm(value);
      setLocalPage(1);
    }

    onSearchChangeProp?.(value);
  };

  const handleSearchColumnChange = (columnId: string) => {
    if (!externalSearch) {
      setLocalSearchColumn(columnId);
      setLocalPage(1);
    }

    onSearchColumnChangeProp?.(columnId);
  };

  const getRowKey = (row: T, index: number): string | number => {
    if (typeof rowKey === "function") {
      return rowKey(row);
    }

    const value = row[rowKey];
    return typeof value === "string" || typeof value === "number"
      ? value
      : index;
  };

  const visibleColumnsData = useMemo(
    () => columns.filter((column) => visibleColumns.includes(column.id)),
    [columns, visibleColumns],
  );

  return (
    <Paper
      elevation={0}
      sx={{
        overflow: "hidden",
        backgroundColor: "transparent",
        ...sx,
      }}
    >
      <div className="border-b border-gray-300 mb-3">
        {filters && <DataFilters {...filters} />}
        {showSearch && (
          <DataTableSearch
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            searchColumn={searchColumn}
            onSearchColumnChange={handleSearchColumnChange}
            searchableColumns={searchableColumns}
            searchPlaceholder={searchPlaceholder}
            columns={columns}
            visibleColumns={visibleColumns}
            onVisibleColumnsChange={setVisibleColumns}
          />
        )}
      </div>

      <TableContainer>
        <Table size={size}>
          <TableHead sx={{ bgcolor: "grey.150" }}>
            <TableRow>
              {visibleColumnsData.map((column, index) => {
                const isMultiSortActive =
                  externalSort && Boolean(sortMapProp?.[column.id]);

                const isSingleSortActive =
                  !sortMapProp && currentOrderBy === column.id;

                const isActive = isMultiSortActive || isSingleSortActive;

                const direction: Order = (sortMapProp?.[column.id] ??
                  (currentOrderBy === column.id
                    ? currentOrder
                    : "asc")) as Order;

                return (
                  <TableCell
                    key={column.id}
                    align={column.align ?? "left"}
                    sortDirection={isActive ? direction : false}
                    sx={{
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      border: "none",
                      ...(column.width ? { width: column.width } : {}),
                      ...(index === 0
                        ? {
                            borderTopLeftRadius: 8,
                            borderBottomLeftRadius: 8,
                          }
                        : {}),
                      ...(index === visibleColumnsData.length - 1 &&
                      !actionColumn
                        ? {
                            borderTopRightRadius: 8,
                            borderBottomRightRadius: 8,
                          }
                        : {}),
                    }}
                  >
                    {column.sortable !== false ? (
                      <TableSortLabel
                        active={isActive}
                        direction={direction}
                        onClick={() => handleRequestSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    ) : (
                      column.label
                    )}
                  </TableCell>
                );
              })}

              {actionColumn && (
                <TableCell
                  align={actionColumn.align ?? "right"}
                  sx={{
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    border: "none",
                    position: "sticky",
                    right: 0,
                    bgcolor: "grey.150",
                    zIndex: 10,
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                    ...(actionColumn.width
                      ? { width: actionColumn.width }
                      : {}),
                  }}
                >
                  {actionColumn.label ?? "Thao tác"}
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading
              ? Array.from({ length: currentRowsPerPage }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    {visibleColumnsData.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align ?? "left"}
                        sx={{ border: "none" }}
                      >
                        <Skeleton variant="text" width="80%" height={24} />
                      </TableCell>
                    ))}

                    {actionColumn && (
                      <TableCell
                        align={actionColumn.align ?? "right"}
                        sx={{
                          position: "sticky",
                          right: 0,
                          bgcolor: "background.paper",
                          zIndex: 9,
                          whiteSpace: "nowrap",
                          border: "none",
                          ...(actionColumn.width
                            ? { width: actionColumn.width }
                            : {}),
                        }}
                      >
                        <Skeleton variant="text" width="80%" height={24} />
                      </TableCell>
                    )}
                  </TableRow>
                ))
              : paginatedRows.map((row, index) => (
                  <TableRow
                    key={getRowKey(row, index)}
                    hover
                    onClick={() => onRowClick?.(row, index)}
                    sx={{
                      cursor: onRowClick ? "pointer" : "default",
                      "& td": {
                        border: "none",
                      },
                    }}
                  >
                    {visibleColumnsData.map((column) => {
                      const value = getCellValue(row, column.id);
                      let displayValue: ReactNode;

                      if (column.showRowNumber) {
                        displayValue = calculateRowNumber(
                          currentPage,
                          currentRowsPerPage,
                          index,
                        );
                      } else if (column.render) {
                        displayValue = column.render(value, row, index);
                      } else {
                        displayValue = value as ReactNode;
                      }

                      return (
                        <TableCell
                          key={column.id}
                          align={column.align ?? "left"}
                        >
                          {displayValue}
                        </TableCell>
                      );
                    })}

                    {actionColumn && (
                      <TableCell
                        align={actionColumn.align ?? "right"}
                        onClick={(event) => event.stopPropagation()}
                        sx={{
                          position: "sticky",
                          right: 0,
                          bgcolor: "background.paper",
                          zIndex: 9,
                          whiteSpace: "nowrap",
                          border: "none",
                          ...(actionColumn.width
                            ? { width: actionColumn.width }
                            : {}),
                        }}
                      >
                        {actionColumn.render(row, index)}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showPagination && (
        <DataTablePagination
          page={currentPage}
          pageCount={pageCount}
          rowsPerPage={currentRowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          total={total}
          startIndex={startIndex}
          endIndex={endIndex}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      )}
    </Paper>
  );
}

export default DataTable;
