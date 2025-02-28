"use client"

import type React from "react"

import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Container,
  useTheme,
} from "@mui/material"
import { Home as HomeIcon, Notifications as NotificationsIcon } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { logoutUser } from "@/service/usersAPI"
import {toast,Toaster} from "react-hot-toast"
import { useDispatch } from "react-redux"
import { resetPosts } from "@/redux/slices/postSlice"

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const router = useRouter()
  const theme = useTheme()
  const dispatch = useDispatch()

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = async () => {
    setAnchorEl(null);
    
    try {
      const res: any = await logoutUser(); 
      if (res?.success) {
        localStorage.removeItem("user"); 
        toast.success("Logged out successfully!");
        dispatch(resetPosts())
        setTimeout(()=>{
          router.replace('/login')
        },3000)
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Something went wrong, try again.");
    }
  };
  

  const navigateToProfile = () => {
    handleMenuClose()
    router.push("/profile")
  }

  const navigateToHome = () => {
    router.push("/")
  }

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 0 } }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
              cursor: "pointer",
            }}
            onClick={navigateToHome}
          >
            SocialFeed
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" onClick={navigateToHome}>
              <HomeIcon />
            </IconButton>
            <IconButton color="inherit" sx={{ mx: 1 }}>
              <NotificationsIcon />
            </IconButton>
            <IconButton edge="end" onClick={handleProfileMenuOpen} color="inherit">
              <Avatar src="/placeholder.svg?height=40&width=40" alt="User" sx={{ width: 32, height: 32 }} />
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={navigateToProfile}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
      <Toaster position="top-center" />
    </AppBar>
  )
}

