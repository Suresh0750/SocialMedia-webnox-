"use client"

import { useState } from "react"
import { Box, Container, Typography, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material"
import PostCard from "@/components/post-card"
import type { IPost, Post } from "@/types/post"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { useFeed } from "@/hooks/useFeed"
import {Oval}  from 'react-loader-spinner'



export default function Feed() {
  const [sortBy, setSortBy] = useState<string>("newest");
  const router = useRouter();

  const { postData, loading, lastPostRef } = useFeed(); // Use the hook


  const handleLike = (postId: string) => {
    // setPosts(
    //   posts.map((post) => {
    //     if (post.id === postId) {
    //       return {
    //         ...post,
    //         likes: post.isLiked ? post.likes - 1 : post.likes + 1,
    //         isLiked: !post.isLiked,
    //       }
    //     }
    //     return post
    //   }),
    // )
  }

  const handleAddComment = (postId: string, comment: string) => {
    // setPosts(
    //   posts.map((post) => {
    //     if (post.id === postId) {
    //       return {
    //         ...post,
    //         comments: [
    //           ...post.comments,
    //           {
    //             id: `comment-${Date.now()}`,
    //             userName: "Current User",
    //             userAvatar: "/placeholder.svg?height=40&width=40",
    //             content: comment,
    //             timestamp: new Date().toISOString(),
    //           },
    //         ],
    //       }
    //     }
    //     return post
    //   }),
    // )
  }

  const sortPosts = (posts: Post[], sortBy: string) => {
    switch (sortBy) {
      case "likes":
        return [...posts].sort((a, b) => b.likes - a.likes)
      case "comments":
        return [...posts].sort((a, b) => b.comments.length - a.comments.length)
      case "newest":
        return [...posts].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      default:
        return posts
    }
  }

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
          {postData?.length
            ? postData.map((post, index) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onLike={handleLike}
                  onAddComment={handleAddComment}
                  ref={index === postData.length - 1 ? lastPostRef : null} // Attach observer to last post
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



// export default function Feed() {
//   // const [posts, setPosts] = useState<Post[]>(mockPosts)
//   const [sortBy, setSortBy] = useState<string>("newest")
//   const router = useRouter()

//   const {postData,loading} = useFeed()

//   const handleLike = (postId: string) => {
//     // setPosts(
//     //   posts.map((post) => {
//     //     if (post.id === postId) {
//     //       return {
//     //         ...post,
//     //         likes: post.isLiked ? post.likes - 1 : post.likes + 1,
//     //         isLiked: !post.isLiked,
//     //       }
//     //     }
//     //     return post
//     //   }),
//     // )
//   }

//   const handleAddComment = (postId: string, comment: string) => {
//     // setPosts(
//     //   posts.map((post) => {
//     //     if (post.id === postId) {
//     //       return {
//     //         ...post,
//     //         comments: [
//     //           ...post.comments,
//     //           {
//     //             id: `comment-${Date.now()}`,
//     //             userName: "Current User",
//     //             userAvatar: "/placeholder.svg?height=40&width=40",
//     //             content: comment,
//     //             timestamp: new Date().toISOString(),
//     //           },
//     //         ],
//     //       }
//     //     }
//     //     return post
//     //   }),
//     // )
//   }

//   const sortPosts = (posts: Post[], sortBy: string) => {
//     switch (sortBy) {
//       case "likes":
//         return [...posts].sort((a, b) => b.likes - a.likes)
//       case "comments":
//         return [...posts].sort((a, b) => b.comments.length - a.comments.length)
//       case "newest":
//         return [...posts].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
//       default:
//         return posts
//     }
//   }

//   // const sortedPosts = sortPosts(posts, sortBy) 

//   return (
//     <>
//       <Navbar />
//       <Container maxWidth="md" sx={{ py: 4 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
//           <Typography variant="h4" component="h1" fontWeight="bold">
//             Social Feed
//           </Typography>
//           <Box sx={{ display: "flex", gap: 2 }}>
//             <FormControl size="small" sx={{ minWidth: 150 }}>
//               <InputLabel id="sort-select-label">Sort By</InputLabel>
//               <Select
//                 labelId="sort-select-label"
//                 value={sortBy}
//                 label="Sort By"
//                 onChange={(e) => setSortBy(e.target.value)}
//               >
//                 <MenuItem value="newest">Newest</MenuItem>
//                 <MenuItem value="likes">Most Likes</MenuItem>
//                 <MenuItem value="comments">Most Comments</MenuItem>
//               </Select>
//             </FormControl>
//             <Button variant="contained" color="primary" onClick={() => router.push("/add-post")}>
//               Add Post
//             </Button>
//           </Box>
//         </Box>

//         <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//           {
//             postData?.length ? postData?.map((post:IPost)=>(
//               <PostCard key={post._id} post={post} onLike={handleLike} onAddComment={handleAddComment} />
//             )) : ''
//           }
//         </Box>
//       </Container>
//       {
//         loading && (
//           <div>
//             <Oval
//           visible={true}
//           height="80"
//           width="80"
//           color="#4fa94d"
//           ariaLabel="oval-loading"
//           wrapperStyle={{}}
//           wrapperClass=""
//           />
//           </div>
//         )
//       }
//     </>
//   )
// }

