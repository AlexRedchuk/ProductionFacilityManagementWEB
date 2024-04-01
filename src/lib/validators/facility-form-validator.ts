import { z } from "zod";

export const FacilityFormCValidator = z.object({
  code: z.string(),
  description: z.string(),
  equipmentArea: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  }),
  areaUsed: z.number().default(0)
});



export type TFacilityFormCValidator = z.infer<typeof FacilityFormCValidator>;
