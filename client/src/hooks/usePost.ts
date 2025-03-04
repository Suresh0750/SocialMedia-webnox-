"use client"
import { PostFormData, postFormSchema } from "@/schemas/postSchema"
import { createPost } from "@/service/postAPI"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useEffect } from "react"
import { useForm,Controller } from "react-hook-form"

export const usePost = () => {
  const [userId, setUserId] = useState<string>("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
const [imagePreview, setImagePreview] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: { content: "" },
  })

  useEffect(() => {
    const user = localStorage.getItem("user")
    const result = user ? JSON.parse(user) : null
    if (result?._id) setUserId(result._id)
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file){
      setSelectedImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const onSubmit = async (data: PostFormData) => {
    try {
      if (!selectedImage) {
        console.warn("No image selected")
        return
      }

      const formData = new FormData()
      formData.append("image", selectedImage)
      formData.append("userId", userId)

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
      })

      const result = await createPost(formData)
    
      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      return { success: false, message: errorMessage };
    }
  }

  return {
    form: { handleSubmit, control, errors, isSubmitting ,Controller},
    actions: { onSubmit, handleImageChange, imagePreview, setImagePreview },
  }
}
