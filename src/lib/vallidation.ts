import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signupSchema = z.object({
  email: requiredString.email("Invalid email"),
  username: requiredString.regex(
    /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim,
    "Only letters, number, - and _ allowed",
  ),
  displayname: requiredString.max(20, "Must be at least 20 characters"),
  passwordHash: requiredString.min(8, "Must be at least 8 characters"),
});

export type SignupValues = z.infer<typeof signupSchema>;

export const optSchema = z.object({
  username:requiredString,
  code: requiredString,
});

export type OtpValues = z.infer<typeof optSchema>;

export const loginSchema = z
  .object({
    usernameOremail: requiredString, 
    passwordHash: requiredString,
  })

export type loginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: requiredString,
});
