
import { z } from "zod"

export const passwordSchema =  z
.string()
.min(6, 'Password must be at least 6 characters')
.regex(/[A-Z]/, 'Must contain at least one uppercase letter')
.regex(/[a-z]/, 'Must contain at least one lowercase letter')
.regex(/\d/, 'Must contain at least one number')
.regex(/[@$!%*?&]/, 'Must contain at least one special character (@, $, !, %, *, ?, &)')
.refine((val) => !/\s/.test(val), 'Password must not contain spaces')

export const emailSchema = z.string().email("Invalid email address")

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
  })
  

export type LoginFormData = z.infer<typeof loginSchema>


export const signupSchema = z.object({
  username : z.string().trim().min(4,"name should be above 4 letters")
})