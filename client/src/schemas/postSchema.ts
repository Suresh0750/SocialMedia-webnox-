


import { z } from "zod"


export const postFormSchema = z.object({
    content: z.string().trim().min(1, "Post content is required").max(500, "Post content cannot exceed 500 characters"),
  })

export type PostFormData = z.infer<typeof postFormSchema>