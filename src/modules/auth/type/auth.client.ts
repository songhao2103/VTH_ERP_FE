import * as zod from "zod";

export const formLoginDataSchema = zod.object({
  account: zod.string().min(1, "Account is required"),
  password: zod.string().min(1, "Password is required"),
});

export type FormLoginData = zod.infer<typeof formLoginDataSchema>;
