import { z } from "zod";

export const sortOrderSchema = z.enum(["asc", "desc"]);

export const baseListQuery = z.object({
  pageIndex: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().default(10),
  searchKey: z.string().default("").optional(),
  sortBy: z.string().default("").optional(),
  sortOrder: z.enum(["asc", "desc"]).optional().default("asc"),
});

export type BaseListQuery = z.infer<typeof baseListQuery>;
