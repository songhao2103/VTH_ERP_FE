import { employeeListQueryOptions } from "@/modules/employee/api/employee.queries";
import EmployeeList from "@/modules/employee/components/EmployeeList";
import { employeeParamSchema } from "@/modules/employee/types/employee.type.param";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/employee")({
  component: EmployeeList,
  validateSearch: employeeParamSchema,
  loaderDeps: ({ search }) => ({
    pageIndex: search.pageIndex,
    pageSize: search.pageSize,
    searchKey: search.searchKey,
    sortBy: search.sortBy,
    sortOrder: search.sortOrder,
    isDelete: search.isDelete,
  }),

  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(
      employeeListQueryOptions({
        isDelete: false,
        pageIndex: deps.pageIndex,
        pageSize: deps.pageSize,
        searchKey: deps.searchKey,
        sortBy: deps.sortBy,
        sortOrder: deps.sortOrder,
      }),
    );
  },
});
