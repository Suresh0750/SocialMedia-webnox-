"use client";

import { useState, forwardRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
  TextField,
  Button,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Comment as CommentIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { formatDistanceToNow } from "date-fns";
import type { IComment, IPost } from "@/types/post";
import Image from "next/image";

// Define props and ref type
interface PostCardProps {
  post: IPost;
  onLike: (postId: string) => void;
  onAddComment: (postId: string, comment: string) => void;
}

// * Use forwardRef to accept ref from parent component
const PostCard = forwardRef<HTMLDivElement, PostCardProps>(({ post, onLike, onAddComment }, ref) => {
  const [expanded, setExpanded] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [userId,setUserId] = useState<string|null>("null")

  
  useEffect(()=>{
      let user = localStorage.getItem('user')
      if(user){
        setUserId(JSON.parse(user)?._id)
      }else{
        setUserId(null)
      }
  })

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      onAddComment(post._id, commentText);
      setCommentText("");
    }
  };

  if(!userId) return

  if(ref){
    console.log('ref',ref,post)
  }

  return (
    <Card ref={ref} elevation={2}> 
      <CardHeader
        avatar={
          <Avatar src={post?.userId?.avatar} alt={post?.userId.username}>
            {post?.userId?.username.charAt(0)}
          </Avatar>
        }
        title={
          <Typography variant="subtitle1" fontWeight="bold">
            {post?.userId?.username}
          </Typography>
        }
        subheader={formatDistanceToNow(new Date(post?.createdAt), { addSuffix: true })}
      />

      <CardContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {post.content}
        </Typography>

        {post.image && (
          <Box sx={{ position: "relative", width: "100%", height: 300, borderRadius: 1, overflow: "hidden", mb: 2 }}>
            <Image src={post.image || "/placeholder.svg"} alt="Post image" fill style={{ objectFit: "cover" }} />
          </Box>
        )}
      </CardContent>

      <CardActions disableSpacing>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label={(post?.like).includes(post?.userId?._id) ? "unlike" : "like"}
            onClick={ async () =>onLike(post._id)}
            color={(post?.like).includes(userId) ? "primary" : "default"}
          >
            {(post?.like).includes(userId) ? (<FavoriteIcon />) : <FavoriteBorderIcon />}
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {post.like.length}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
          <IconButton aria-label="comment" onClick={() => setShowCommentInput(!showCommentInput)}>
            <CommentIcon />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {post.comments.length}
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />
        {post.comments.length > 0 && (
          <Button size="small" onClick={handleExpandClick} sx={{ textTransform: "none" }}>
            {expanded ? "Hide comments" : "See all comments"}
          </Button>
        )}
      </CardActions>

      {showCommentInput && (
        <Box sx={{ px: 2, pb: 2, display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleCommentSubmit();
              }
            }}
          />
          <IconButton color="primary" onClick={handleCommentSubmit} disabled={!commentText.trim()}>
            <SendIcon />
          </IconButton>
        </Box>
      )}

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <List sx={{ py: 0 }}>
          {post.comments.map((comment: IComment,ind:number) => (
            <ListItem key={ind} alignItems="flex-start" sx={{ py: 1 }}>
              <ListItemAvatar>
                <Avatar src={post.userId.avatar} alt={post.userId.username}>
                  {post.userId.username.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
              primary={
                <Typography variant="subtitle2" component="span">
                  {post.userId.username}
                </Typography>
              }
              secondary={
                <>
                  <Typography variant="body2" component="span" color="text.primary">
                    {comment?.comment}
                  </Typography>
                  <Typography variant="caption" component="span" color="text.secondary" sx={{ mt: 0.5 }}>
                    {comment?.createdAt ? ` ${formatDistanceToNow(new Date(comment?.createdAt), { addSuffix: true }) }`: ''}
                  </Typography>
                </>
              }
            />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Card>
  );
});

// Set display name for debugging
PostCard.displayName = "PostCard";

export default PostCard;
