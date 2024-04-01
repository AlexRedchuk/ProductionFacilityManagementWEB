import { z } from "zod";

export const ContractFormValidator = z.object({
  contractNumber: z.string(),
  productFacilityCode: z.string(),
  equipmentTypeQuantities: z.array(z.object({
    equipmentTypeCode: z.string(),
    equipmentQuantity: z.number()
  }))
});

export type Contract = {
    contractNumber: string,
    facility: {
        code: string,
        description: string,
        equipmentArea: number,
        areaUsed: number
    }
    equipmentTypeToQuantities: [{ equipmentType: { code: string, description: string, area: number }, quantity: number}]
}


export type TContractFormValidator = z.infer<typeof ContractFormValidator>;
