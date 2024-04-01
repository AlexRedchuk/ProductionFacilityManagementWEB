"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import facilityManagement from "@/APIs/facilityManagement";
import { getRole } from "@/lib/utils/auth";
import { useLayoutEffect } from "react";
import { EquipmentTypeFormCValidator, TEquipmentTypeFormCValidator } from "@/lib/validators/equipmentTypes-form-validator";
import { ArrowLeftCircle } from "lucide-react";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TEquipmentTypeFormCValidator>({
    resolver: zodResolver(EquipmentTypeFormCValidator),
  });
  const router = useRouter();

  useLayoutEffect(() => {
    if (getRole() !== "Operator" && getRole() !== "Admin") {
      router.push("/home");
    }
  }, []);

  const onSubmit = async (formValues: TEquipmentTypeFormCValidator) => {
    try {
      await facilityManagement
        .post("/api/EquipmentType", formValues)
        .then((res) => {
          router.push("/equipmentTypes");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong");
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
              Create Equipment Type
            </h1>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="code">Code</Label>
                  <Input
                    {...register("code")}
                    type="text"
                    className={cn({
                      "focus-visible:ring-red-500": errors.code,
                    })}
                    placeholder="Equipment code"
                  />
                  {errors?.code && (
                    <p className="text-sm text-red-500">
                      {errors.code.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    {...register("description")}
                    type="text"
                    className={cn({
                      "focus-visible:ring-red-500": errors.description,
                    })}
                    placeholder="Equipment description"
                  />
                  {errors?.description && (
                    <p className="text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="area">Equipment area</Label>
                  <Input
                    {...register("area")}
                    type="number"
                    placeholder="300"
                    className={cn({
                      "focus-visible:ring-red-500": errors.area,
                    })}
                  />
                  {errors?.area && (
                    <p className="text-sm text-red-500">
                      {errors.area.message}
                    </p>
                  )}
                </div>
                <Button className="mt-4">Create equipment type</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
