import { flexRender, type ColumnSizingState } from "@tanstack/react-table";
import { getPinnedStyles } from "../utils/pinning";
import { cn } from "../utils/cn";
import { useDataGridConfig } from "@/shared/components/data-grid/contexts/DataGridConfigContext";
import { useDataGridTable } from "@/shared/components/data-grid/contexts/DataGridTableContext";

export function DataGridFooter<TData>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  columnSizing,
}: {
  columnSizing?: ColumnSizingState;
}) {
  const table = useDataGridTable<TData>();
  const { stickyFooter } = useDataGridConfig<TData>();

  const footerGroups = table.getFooterGroups();
  const hasFooter = footerGroups.some((group) =>
    group.headers.some((header) => !header.isPlaceholder),
  );

  const paginationState = table.getState().pagination;
  const hasPagination = Boolean(paginationState);

  if (!hasFooter && !hasPagination) {
    return null;
  }

  const rowCount = table.getRowCount();
  const pageCount = Math.max(1, table.getPageCount());
  const pageIndex = paginationState?.pageIndex ?? 0;
  const pageSize = (paginationState?.pageSize ?? rowCount) || 10;

  const from = rowCount === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min(rowCount, (pageIndex + 1) * pageSize);

  return (
    <div
      role="rowgroup"
      className={cn(
        "border-t border-neutral-200 bg-neutral-50/95 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/95",
        stickyFooter && "sticky bottom-0 z-30",
      )}
    >
      {hasFooter &&
        footerGroups.map((footerGroup) => (
          <div
            key={footerGroup.id}
            role="row"
            className="flex w-max min-w-full"
          >
            {footerGroup.headers.map((header) => (
              <div
                key={header.id}
                role="cell"
                className={cn(
                  "flex h-10 items-center border-r border-neutral-200 px-3 text-xs text-neutral-600",
                  "dark:border-neutral-800 dark:text-neutral-400",
                  header.column.getIsPinned() &&
                    "bg-neutral-50/95 dark:bg-neutral-900/95",
                )}
                style={getPinnedStyles(header.column, "footer")}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    )}
              </div>
            ))}
          </div>
        ))}

      {hasPagination && (
        <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            Showing {from.toLocaleString()}-{to.toLocaleString()} of{" "}
            {rowCount.toLocaleString()}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={pageSize}
              onChange={(event) =>
                table.setPageSize(Number(event.target.value))
              }
              className={cn(
                "h-9 rounded-lg border border-neutral-200 bg-white px-3 text-sm",
                "outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
                "dark:border-neutral-800 dark:bg-neutral-950",
              )}
            >
              {[10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size} / page
                </option>
              ))}
            </select>

            <div className="text-sm text-neutral-600 dark:text-neutral-300">
              Page {pageIndex + 1} / {pageCount}
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="h-9 rounded-lg border border-neutral-200 px-3 text-sm transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
              >
                {"<<"}
              </button>

              <button
                type="button"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="h-9 rounded-lg border border-neutral-200 px-3 text-sm transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
              >
                {"<"}
              </button>

              <button
                type="button"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="h-9 rounded-lg border border-neutral-200 px-3 text-sm transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
              >
                {">"}
              </button>

              <button
                type="button"
                onClick={() => table.setPageIndex(pageCount - 1)}
                disabled={!table.getCanNextPage()}
                className="h-9 rounded-lg border border-neutral-200 px-3 text-sm transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
              >
                {">>"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
