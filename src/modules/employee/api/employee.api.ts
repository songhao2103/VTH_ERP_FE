/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EmployeeParams } from "@/modules/employee/types/employee.type.param";
import { privateApi } from "@/app/http/http.private";
import type { ApiEnvelope } from "@/app/http/http.types";

export const EmployeeApis = {
  list: (params: EmployeeParams): Promise<ApiEnvelope<any>> =>
    privateApi.get("/hola/user-list", { params: params }),
};
