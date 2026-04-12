import { getEmployeeListQueryOptions } from "@/modules/employee/api/employee.queries";
import EmployeeList from "@/modules/employee/components/EmployeeList";
import {
  employeeParamSchema,
  type EmployeeParams,
} from "@/modules/employee/types/employee.type.param";
import { buildPageRouteOptions } from "@/shared/router/buildPageRouteOptions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/employee")(
  buildPageRouteOptions("/_private/employee", {
    component: EmployeeList,
    validateSearch: employeeParamSchema,
    loaderDeps: ({ search }) => {
      const searchParams = search as EmployeeParams;
      return {
        page: searchParams.page,
        pageSize: searchParams.pageSize,
        sortOrder: searchParams.sortOrder,
        sortBy: searchParams.sortBy,
        searchKey: searchParams.searchKey,
        isDelete: searchParams.isDelete,
      };
    },

    loader: async ({ context, deps }) => {
      await context.queryClient.ensureQueryData(
        getEmployeeListQueryOptions({
          page: deps.page,
          pageSize: deps.pageSize,
          sortOrder: deps.sortOrder,
          sortBy: deps.sortBy,
          searchKey: deps.searchKey,
          isDelete: deps.isDelete,
        }),
      );
    },
  }),
);
