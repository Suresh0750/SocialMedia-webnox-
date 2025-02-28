"use client"

import Link from "next/link"

import { Box, Card, CardContent, TextField, Button, Typography, InputAdornment, IconButton, Alert } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useLogin } from "@/hooks/useLogin"
import { LoginFormData } from "@/schemas/usersSchema"
import {toast,Toaster} from "react-hot-toast"
import { useRouter } from "next/navigation"




export default function LoginPage() {

    const Router = useRouter()
    const {
        form: { register, handleSubmit, errors, isSubmitting },
        actions: { onSubmit, showPassword, setShowPassword },
        error,
      } = useLogin()

      const handleLogin = async (data:LoginFormData) => {
        const result :any = await onSubmit(data);
        if(result.success){
          toast.success(result?.message as string)
          setTimeout(()=>{
            Router.replace('/feed')
          },3000)
        }else{
          toast.error(result?.message as string)
        }
      };
      
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
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Please sign in to continue
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(handleLogin)} noValidate>
            <TextField
              {...register("email")}
              margin="normal"
              fullWidth
              label="Email Address"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              {...register("password")}
              margin="normal"
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{ mt: 3, mb: 2 }}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <Link href="/signup" style={{ color: "primary.main", textDecoration: "none" }}>
                Sign up
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


