"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  SignInCredentialsValidator,
  TSignInCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { isAuth, logIn } from "@/lib/utils/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import facilityManagement from "@/APIs/facilityManagement";
import { useLayoutEffect } from "react";



const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInCredentialsValidator>({
    resolver: zodResolver(SignInCredentialsValidator),
  });
  const router = useRouter();

  useLayoutEffect(() => {
  if (isAuth()) {
    router.push("/contracts");
  }
  }, [])

  const onSubmit = async (formValues: TSignInCredentialsValidator) => {
    try {
      await facilityManagement
        .post("/login", formValues)
        .then(async (res) => {
          await logIn(res.data.accessToken);
          router.push("/contracts");
          router.refresh();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Wrong credentials");
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
              Sign in to your account
            </h1>

            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/sign-up"
            >
              Don&apos;t have an account?
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
                <Button className="mt-4">Sing in</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
