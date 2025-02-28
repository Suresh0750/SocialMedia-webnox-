"use client"

import { useEffect, useState } from "react"
import { Box, Container, Typography, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material"
import PostCard from "@/components/post-card"
import type { IPost, Post } from "@/types/post"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { useFeed } from "@/hooks/useFeed"
import {Oval}  from 'react-loader-spinner'



export default function Feed() {
  
  const router = useRouter();

  const {posts,loading, lastPostRef,handleAddComment,handleLike,sortBy, setSortBy} = useFeed(); // Use the hook



useEffect(()=>{

},[])


  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}
        >
          <Typography variant="h4" component="h1" fontWeight="bold">
            Social Feed
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel id="sort-select-label">Sort By</InputLabel>
              <Select
                labelId="sort-select-label"
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="likes">Most Likes</MenuItem>
                <MenuItem value="comments">Most Comments</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={() => router.push("/add-post")}>
              Add Post
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {posts?.length
            ? posts.map((post, index) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onLike={handleLike}
                  onAddComment={handleAddComment}
                  ref={index === posts?.length - 1 ? lastPostRef : null} // Attach observer to last post
                />
              ))
            : "No posts available"}
        </Box>
      </Container>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Oval visible={true} height="50" width="50" color="#4fa94d" />
        </Box>
      )}
    </>
  );
}

