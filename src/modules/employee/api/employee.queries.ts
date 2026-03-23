import { EmployeeApis } from "@/modules/employee/api/employee.api";
import type { EmployeeParams } from "@/modules/employee/types/employee.type.param";
import { queryOptions } from "@tanstack/react-query";

export const EMPLOYEE_QUERY_KEYS = {
  list: (params: EmployeeParams) => ["users", "list", params] as const,
};

export const useGetEmployeeList = (params: EmployeeParams) => {
  queryOptions({
    queryKey: EMPLOYEE_QUERY_KEYS.list(params),
    queryFn: async () => {
      const response = await EmployeeApis.list(params);
      return response.data;
    },
  });
};
