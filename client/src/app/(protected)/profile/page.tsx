"use client"

import type React from "react"

import { useEffect, useState } from "react"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material"
import { AccountCircle, AlternateEmail, CalendarMonth, Edit, Settings } from "@mui/icons-material"
import { UserData } from "@/types/user"
import {Oval}  from 'react-loader-spinner'
import { useDispatch } from "react-redux"
import { resetPosts } from "@/redux/slices/postSlice"



export default function ProfilePage() {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState(0)
  const [userData,setUserData] = useState<UserData | null>(null)
  const dispatch = useDispatch()

useEffect(() => {
    const user = localStorage.getItem("user");
    dispatch(resetPosts())
    if (user) {
      try {
        setUserData(JSON.parse(user));
      } catch (error) {
        setUserData(null);
      }
    }
  }, []);
  

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  if(!userData) return(
    <Oval visible={true} height="50" width="50" color="#4fa94d" />
  )

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={4}>
        {/* Left sidebar with user info */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={2}
            sx={{
              height: "100%",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: 120,
                bgcolor: "primary.main",
                position: "relative",
              }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: -6,
                position: "relative",
                pb: 2,
              }}
            >
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  border: `4px solid ${theme.palette.background.paper}`,
                  bgcolor: "secondary.main",
                  fontSize: 36,
                  fontWeight: "bold",
                }}
                src={userData.avatar || undefined}
              >
                {getInitial(userData.username)}
              </Avatar>

              <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
                {userData.username}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {userData.email}
              </Typography>

              <Button variant="outlined" startIcon={<Edit />} sx={{ mt: 2 }}>
                Edit Profile
              </Button>
            </Box>

            <Divider />

            <CardContent>
              <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <AccountCircle color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Username
                    </Typography>
                    <Typography variant="body1">{userData.username}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <AlternateEmail color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1">{userData.email}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <CalendarMonth color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Member Since
                    </Typography>
                    <Typography variant="body1">{formatDate(userData.createdAt)}</Typography>
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Right content area */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={2}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: "100%",
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
                <Tab label="Overview" />
                <Tab label="Activity" />
                <Tab label="Settings" icon={<Settings />} iconPosition="end" />
              </Tabs>
            </Box>

            <Box sx={{ p: 3 }}>
              {activeTab === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Account Overview
                  </Typography>
                  <Typography paragraph>
                    Welcome to your profile, {userData.username}! This is your personal space where you can manage your
                    account information and settings.
                  </Typography>

                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      Account Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Account ID
                        </Typography>
                        <Typography variant="body1" sx={{ wordBreak: "break-all" }}>
                          {userData._id}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Last Updated
                        </Typography>
                        <Typography variant="body1">{formatDate(userData.updatedAt)}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              )}

              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Recent Activity
                  </Typography>
                  <Typography color="text.secondary">Your recent account activity will appear here.</Typography>
                </Box>
              )}

              {activeTab === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Account Settings
                  </Typography>
                  <Typography paragraph>Manage your account settings and preferences here.</Typography>

                  <Stack spacing={3} sx={{ mt: 3 }}>
                    <Button variant="contained" fullWidth>
                      Change Password
                    </Button>
                    <Button variant="outlined" fullWidth>
                      Update Email
                    </Button>
                    <Button variant="outlined" color="error" fullWidth>
                      Delete Account
                    </Button>
                  </Stack>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

