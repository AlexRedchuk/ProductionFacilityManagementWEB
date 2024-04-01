import { z } from "zod";

export const SignInCredentialsValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const SignUpCredentialsValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    { message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one of special characters (@$!%*#?&)' }
  ),
  role: z.enum(["client", "operator"])
});

export type TSignInCredentialsValidator = z.infer<typeof SignInCredentialsValidator>;
export type TSignUpCredentialsValidator = z.infer<typeof SignUpCredentialsValidator>;