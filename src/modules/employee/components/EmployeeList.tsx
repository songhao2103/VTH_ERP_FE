import { useGetEmployeeList } from "@/modules/employee/api/employee.queries";
import { employeeColumns } from "@/modules/employee/constant/employee.columns";
import { makeEmployees } from "@/modules/employee/constant/employee.constant";
import type { EmployeeRow } from "@/modules/employee/types/employee.type.client";
import { DataGrid } from "@/shared/components/data-grid/DataGrid";
import type { DataGridHandle } from "@/shared/components/data-grid/dataGrid.types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Route } from "@tanstack/react-router";
import type { RowSelectionState } from "@tanstack/react-table";
import React from "react";

const EmployeeList = () => {
  const gridRef = React.useRef<DataGridHandle>(null);
  const param = Route.useParams();

  const { data } = useSuspenseQuery(useGetEmployeeList());
  const allRows = React.useMemo(() => makeEmployees(10000), []);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(20);
  const [selectedRowIds, setSelectedRowIds] = React.useState<RowSelectionState>(
    {},
  );

  const pageRows = React.useMemo(() => {
    const start = pageIndex * pageSize;
    return allRows.slice(start, start + pageSize);
  }, [allRows, pageIndex, pageSize]);

  const selectedCount = React.useMemo(
    () => Object.keys(selectedRowIds).length,
    [selectedRowIds],
  );

  return (
    <section className="min-w-0 max-w-full overflow-hidden p-6">
      <div className="flex min-w-0 max-w-full flex-col gap-4 overflow-hidden">
        <div className="min-w-0 max-w-full rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-xl font-semibold">DataGrid Demo</h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                10,000 rows giả lập · server pagination giả lập · sticky column
                · virtualization
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => gridRef.current?.clearSelection()}
                className="rounded-lg border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800"
              >
                Clear selection
              </button>

              <button
                type="button"
                onClick={() => {
                  const ids = Object.keys(
                    gridRef.current?.selectedRowIds ?? {},
                  );
                  console.log("selectedRowIds", ids);
                }}
                className="rounded-lg border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800"
              >
                Log selected ids
              </button>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
            <div className="rounded-lg bg-blue-50 px-3 py-2 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
              Selected: <span className="font-semibold">{selectedCount}</span>
            </div>

            <div className="rounded-lg bg-neutral-100 px-3 py-2 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
              Current page:{" "}
              <span className="font-semibold">{pageIndex + 1}</span>
            </div>

            <div className="rounded-lg bg-neutral-100 px-3 py-2 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
              Page size: <span className="font-semibold">{pageSize}</span>
            </div>
          </div>
        </div>

        <DataGrid<EmployeeRow>
          ref={gridRef}
          data={pageRows}
          columns={employeeColumns}
          rowId={(row) => row.id}
          selectable
          multiSelect
          // height={860}
          overscan={10}
          estimatedRowHeight={46}
          stickyHeader
          zebraRows
          defaultColumnPinning={{
            left: ["__dg_selection__", "employeeCode"],
          }}
          selectedRowIds={selectedRowIds}
          onSelectedRowIdsChange={setSelectedRowIds}
          pagination={{
            mode: "server",
            pageIndex,
            pageSize,
            total: allRows.length,
            onChange: (nextPageIndex, nextPageSize) => {
              setPageIndex(nextPageIndex);
              setPageSize(nextPageSize);
            },
          }}
          onRowClick={(row) => {
            console.log("onRowClick", row);
          }}
          onRowDoubleClick={(row) => {
            console.log("onRowDoubleClick", row);
          }}
          onRowContextMenu={(row, rowIndex, event) => {
            console.log("onRowContextMenu", {
              row,
              rowIndex,
              x: event.clientX,
              y: event.clientY,
            });
          }}
          getRowClassName={(_row, _rowIndex, selected) =>
            selected ? "ring-1 ring-blue-200 dark:ring-blue-500/30" : undefined
          }
        />
      </div>
    </section>
  );
};

export default EmployeeList;
