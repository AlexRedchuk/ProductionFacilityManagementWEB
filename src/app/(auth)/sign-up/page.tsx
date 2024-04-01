"use client";
import facilityManagement from "@/APIs/facilityManagement";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { isAuth } from "@/lib/utils/auth";
import {
  SignUpCredentialsValidator,
  TSignUpCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpCredentialsValidator>({
    resolver: zodResolver(SignUpCredentialsValidator),
  });

  const router = useRouter();

  useLayoutEffect(() => {
    if (isAuth()) {
      router.push("/contracts");
    }
  }, []);

  const onSubmit = async (formValues: TSignUpCredentialsValidator) => {
    try {
      await facilityManagement
        .post("/api/RoleAuth/register", formValues)
        .then((res) => {
          toast.success("Registration success");
          router.push("/sign-in");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container relative flex pt-24 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign up to your account
            </h1>

            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/sign-in"
            >
              Already have an account?
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    type="email"
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Password"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <RadioGroup defaultValue="client">
                  <div className="flex mt-3 flex-row justify-around">
                    <div className="flex items-center space-x-2">
                      <Input
                        {...register("role")}
                        className="w-4 h-4 cursor-pointer accent-neutral-800"
                        type="radio"
                        value="client"
                        defaultChecked
                        id="client"
                      />
                      <Label htmlFor="client">As client</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        {...register("role")}
                        className="w-4 h-4 cursor-pointer accent-neutral-800"
                        type="radio"
                        value="operator"
                        id="operator"
                      />
                      <Label htmlFor="operator">As operator</Label>
                    </div>
                  </div>
                </RadioGroup>
                <Button className="mt-4">Sing up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
