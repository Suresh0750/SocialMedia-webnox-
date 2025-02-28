"use client"

import type React from "react"

import { Container, Typography, Box, TextField, Button, Paper, IconButton, Card, CardMedia } from "@mui/material"
import { ArrowBack as ArrowBackIcon, Image as ImageIcon, Clear as ClearIcon } from "@mui/icons-material"
import { z } from "zod"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { usePost } from "@/hooks/usePost"
import {toast,Toaster} from "react-hot-toast"
import { useDispatch } from "react-redux"
import { resetPosts } from "@/redux/slices/postSlice"


const postSchema = z.object({
  content: z.string().min(1, "Post content is required").max(500, "Post content cannot exceed 500 characters"),
})

type PostFormData = z.infer<typeof postSchema>

export default function AddPost() {

  const Router = useRouter()
  const dispatch = useDispatch()
  const {
    form: { handleSubmit, errors, isSubmitting ,control,Controller},
    actions: {onSubmit, handleImageChange ,imagePreview,setImagePreview },
} = usePost()



  const clearImage = () => {
    setImagePreview(null)
  }

  const handleSubmitPost = async (data: PostFormData)=>{
    if(!imagePreview) return toast.error('Please select the image')
    const result = await onSubmit(data)
    if(result?.success){
      toast.success(result?.message)
      dispatch(resetPosts()) 
      setTimeout(()=>{
        Router.push('/feed')
      },3000)
    }else{
      toast.error(result?.message)
    } 
  }
 

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <IconButton onClick={() => Router.push("/feed")} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" component="h1" fontWeight="bold">
              Create New Post
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(handleSubmitPost)}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="What's on your mind?"
                  multiline
                  rows={4}
                  fullWidth
                  error={!!errors.content}
                  helperText={errors.content?.message}
                />
              )}
            />

            {imagePreview ? (
              <Card sx={{ position: "relative", mb: 2 }}>
                <CardMedia
                  component="img"
                  image={imagePreview}
                  alt="Post image preview"
                  sx={{ maxHeight: 300, objectFit: "contain" }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
                  }}
                  onClick={clearImage}
                >
                  <ClearIcon />
                </IconButton>
              </Card>
            ) : (
              <Box>
                <input accept="image/*" id="image-upload" type="file" hidden onChange={handleImageChange} />
                <label htmlFor="image-upload">
                  <Button variant="outlined" component="span" startIcon={<ImageIcon />}>
                    Add Image
                  </Button>
                </label>
              </Box>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
              <Button variant="outlined" onClick={() => Router.push("/feed")}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                Post
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
      <Toaster position="top-center" />
    </>
  )
}

