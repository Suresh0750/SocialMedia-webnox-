"use client"

import { useRouter } from "next/navigation"
import { Box, Fab } from "@mui/material"
import { Plus } from "lucide-react"

export default function Page() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gray-50">
      <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
        <Fab color="primary" aria-label="add post" onClick={() => router.push("/create-post")}>
          <Plus />
        </Fab>
      </Box>
    </main>
  )
}
