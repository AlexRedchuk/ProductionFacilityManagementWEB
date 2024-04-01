"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import facilityManagement from "@/APIs/facilityManagement";
import { getRole } from "@/lib/utils/auth";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  ContractFormValidator,
  TContractFormValidator,
} from "@/lib/validators/contract-form-validator";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TFacilityFormCValidator } from "@/lib/validators/facility-form-validator";
import { TEquipmentTypeFormCValidator } from "@/lib/validators/equipmentTypes-form-validator";
import { ArrowLeftCircle } from "lucide-react";


const Page = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TContractFormValidator>({
    resolver: zodResolver(ContractFormValidator),
  });
  const router = useRouter();
  const [facilities, setFacilities] = useState<TFacilityFormCValidator[]>([]);
  const [equipmentTypes, setEquipmentTypes] = useState<
    TEquipmentTypeFormCValidator[]
  >([]);
  const [equpmentTypeQuantities, setEqupmentTypeQuantities] = useState([1]);

  useEffect(() => {
    async function getData() {
      const res = await facilityManagement.get<TFacilityFormCValidator[]>(
        `/api/ProductionFacility`
      );
      setFacilities(res.data);
      const eq = await facilityManagement.get<TEquipmentTypeFormCValidator[]>(
        `/api/EquipmentType`
      );
      setEquipmentTypes(eq.data);
    }
    getData();
  }, []);

  useLayoutEffect(() => {
    if (getRole() !== "Client" && getRole() !== "Admin") {
      router.push("/contracts");
    }
  }, []);

  const onSubmit = async (formValues: TContractFormValidator) => {
    try {
      console.log(formValues);
      await facilityManagement
        .post("/api/Contract", formValues)
        .then((res) => {
          toast.success("Contract created")
          router.push("/contracts");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container relative flex pt-24 flex-col items-center justify-center lg:px-0">
        <div className="absolute top-24 left-72">
          <button onClick={() => router.back()}>
            <ArrowLeftCircle size={40} />
          </button>
        </div>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create contract
            </h1>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="contractNumber">Contract number</Label>
                  <Input
                    {...register("contractNumber")}
                    type="text"
                    className={cn({
                      "focus-visible:ring-red-500": errors.contractNumber,
                    })}
                    placeholder="Contract number"
                  />
                  {errors?.contractNumber && (
                    <p className="text-sm text-red-500">
                      {errors.contractNumber.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="facilityCode">Facility</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue("productFacilityCode", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select facility " />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Facility</SelectLabel>
                        {facilities.map((facility) => (
                          <SelectItem key={facility.code} value={facility.code}>
                            {facility.description}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors?.productFacilityCode && (
                    <p className="text-sm text-red-500">
                      {errors.productFacilityCode.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="equipmentTypes">Equipment types</Label>
                  {equpmentTypeQuantities.map((el, i) => {
                    return (
                      <div className="flex space-x-2 mb-2" key={i}>
                        <Select
                          onValueChange={(value) => {
                            setValue(
                              `equipmentTypeQuantities.${i}.equipmentTypeCode`,
                              value
                            );
                          }}
                        >
                          <SelectTrigger className="w-[80%]">
                            <SelectValue placeholder="Select equipment type " />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Equipment type</SelectLabel>
                              {equipmentTypes.map((equipment) => (
                                <SelectItem
                                  key={equipment.code}
                                  value={equipment.code}
                                >
                                  {equipment.description}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Input
                          onChange={(e) =>
                            setValue(
                              `equipmentTypeQuantities.${i}.equipmentQuantity`,
                              +e.target.value
                            )
                          }
                          defaultValue={0}
                          min={0}
                          className="w-[20%]"
                          type="number"
                        />
                      </div>
                    );
                  })}
                  <Button
                    type="button"
                    onClick={() =>
                      setEqupmentTypeQuantities((value) => [...value, 1])
                    }
                    variant={"secondary"}
                    className={
                      equpmentTypeQuantities.length >= equipmentTypes.length
                        ? "hidden"
                        : ""
                    }
                  >
                    Add equipment type
                  </Button>
                </div>

                <Button className="mt-4">Create contract</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
