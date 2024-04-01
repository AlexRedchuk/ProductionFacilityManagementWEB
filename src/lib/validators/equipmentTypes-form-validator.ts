import { z } from "zod";

export const EquipmentTypeFormCValidator = z.object({
  code: z.string(),
  description: z.string(),
  area: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  })
});


export type TEquipmentTypeFormCValidator = z.infer<typeof EquipmentTypeFormCValidator>;