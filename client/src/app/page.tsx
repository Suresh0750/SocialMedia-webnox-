"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
// import { useSelector } from "react-redux"
import { Box, Fab } from "@mui/material"
import { Plus } from "lucide-react"
// import { SocialFeed } from "@/components/social-feed"
// import type { RootState } from "@/lib/redux/store"

export default function Page() {
  const router = useRouter()
  // const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push("/login")
  //   }
  // }, [isAuthenticated, router])

  // if (!isAuthenticated) return null

  return (
    <main className="min-h-screen bg-gray-50">
      {/* <SocialFeed /> */}
      <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
        <Fab color="primary" aria-label="add post" onClick={() => router.push("/create-post")}>
          <Plus />
        </Fab>
      </Box>
    </main>
  )
}
