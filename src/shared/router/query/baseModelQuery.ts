import { z } from "zod";

export const OPEN_MODAL_VALUES = [
  "create",
  "edit",
  "delete",
  "detail",
] as const;

export const crudModalNameSchema = z.enum(OPEN_MODAL_VALUES);

export const baseModalQuerySchema = z.object({
  modal: crudModalNameSchema.optional(),
  id: z.string().optional(),
});

export type TOpenModel = z.infer<typeof crudModalNameSchema>;
export type BaseModalSearch = z.infer<typeof baseModalQuerySchema>;
export type CrudModalName = z.infer<typeof crudModalNameSchema>;
