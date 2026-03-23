import { z } from "zod";
import { baseListQuery } from "@/shared/router/query/baseListQuery";
import { baseModalQuerySchema } from "@/shared/router/query/baseModelQuery";

export const employeeParamSchema = baseListQuery
  .merge(baseModalQuerySchema)
  .extend({
    isDelete: z.boolean().optional().default(true),
  });

export type EmployeeParams = z.infer<typeof employeeParamSchema>;
