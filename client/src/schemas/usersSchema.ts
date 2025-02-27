
import { z } from "zod"

export const passwordSchema =  z
.string().trim()
.min(6, 'Password must be at least 6 characters')
.regex(/[A-Z]/, 'Must contain at least one uppercase letter')
.regex(/[a-z]/, 'Must contain at least one lowercase letter')
.regex(/\d/, 'Must contain at least one number')
.regex(/[@$!%*?&]/, 'Must contain at least one special character (@, $, !, %, *, ?, &)')
.refine((val) => !/\s/.test(val), 'Password must not contain spaces')

export const emailSchema = z.string().trim().email("Invalid email address")

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
  })
  

export type LoginFormData = z.infer<typeof loginSchema>



export const signupSchema = z.object({
  username: z.string().trim().min(4, "Name must be at least 4 characters"),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})


export type SignupFormData = z.infer<typeof signupSchema>