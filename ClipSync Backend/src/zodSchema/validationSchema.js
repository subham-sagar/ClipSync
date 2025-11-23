import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must not exceed 30 characters")
    .trim(),

  password: z
    .string()
    .min(4, "Password must be at least 4 characters long")
    .max(100, "Password must not exceed 100 characters")
});

export const signinSchema = z.object({
  username: z.string().min(1, "Username is required").trim(),
  password: z.string().min(1, "Password is required")
});
