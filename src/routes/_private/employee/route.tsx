import { useGetEmployeeList } from "@/modules/employee/api/employee.queries";
import EmployeeList from "@/modules/employee/components/EmployeeList";
import { employeeParamSchema } from "@/modules/employee/types/employee.type.param";
import { buildPageRouteOptions } from "@/shared/router/buildPageRouteOptions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/employee")(
  buildPageRouteOptions("/_private/employee", {
    component: EmployeeList,
    validateSearch: employeeParamSchema,
    loaderDeps: ({ search }) => ({
      pageIndex: search.pageIndex,
    }),

    loader: async ({ context, deps }) => {
      await context.queryClient.ensureQueryData(
        useGetEmployeeList({
          isDelete: false,
          page: deps.pageIndex,
        }),
      );
    },
  }),
);
