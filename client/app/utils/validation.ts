import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const userSchema = z.object({
  email: z.string().email("Invalid email format"),
  userName: z.string().min(1, "User Name is required"),
  roleId: z.string().min(1, "Role is required"),
  status: z.string().min(1, "Status is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const editUserSchema = z.object({
  roleId: z.string().min(1, "Role is required"),
  status: z.string().min(1, "Status is required"),
});
