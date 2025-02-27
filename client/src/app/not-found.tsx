import { Box, Button, Container, Typography } from "@mui/material"
import Link from "next/link"

export default function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          py: 4,
        }}
      >
        <Typography variant="h1" component="h1" fontWeight="bold" sx={{ mb: 2 }}>
          404
        </Typography>
        <Typography variant="h5" component="h2" sx={{ mb: 4 }}>
          Page not found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        <Button component={Link} href="/" variant="contained" size="large">
          Go to Home
        </Button>
      </Box>
    </Container>
  )
}

