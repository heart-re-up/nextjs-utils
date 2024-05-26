import { number, object, string } from "zod";

export const ZodModelSchema = object({
  id: number(),
  name: string(),
  age: number(),
});

export type ZodModelType = Zod.infer<typeof ZodModelSchema>;
