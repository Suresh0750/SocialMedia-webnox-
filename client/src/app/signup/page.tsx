"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Box, Card, CardContent, TextField, Button, Typography, InputAdornment, IconButton, Alert } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useSignup } from "@/hooks/useSignup"
import { SignupFormData } from "@/schemas/usersSchema"
import {toast,Toaster} from "react-hot-toast"


export default function SignupPage() {

  const {
    form: { register, handleSubmit, errors, isSubmitting },
    actions: { onSubmit, showPassword, setShowPassword },
    error,
  } = useSignup()

  const Router = useRouter()
  const handleSignup = async(data:SignupFormData)=>{
    const result :SubmitResponse = await onSubmit(data);
    if (result.success) {
      toast.success(result.message as string); 
      setTimeout(()=>{
        Router.push('/login')
      },3000)
    } else {
      toast.error(result.message as string); 
    }
  }


  return (
    <>
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", mx: 2 }} elevation={4}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Join our community today
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(handleSignup)} noValidate>
            <TextField
              {...register("username")}
              margin="normal"
              fullWidth
              label="Full Name"
              autoComplete="name"
              autoFocus
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              {...register("email")}
              margin="normal"
              fullWidth
              label="Email Address"
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              {...register("password")}
              margin="normal"
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              {...register("confirmPassword")}
              margin="normal"
              fullWidth
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{ mt: 3, mb: 2 }}
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "primary.main", textDecoration: "none" }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
    <Toaster position="top-center" />
    </>
  )
}


