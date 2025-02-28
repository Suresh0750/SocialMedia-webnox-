import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "@/types/post"; 

interface PostState {
  posts: IPost[];
}

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<IPost>) => {
      state.posts = [action.payload, ...state.posts]; 
    },
    toggleLike: (state, action: PayloadAction<{ postId: string; userId: string }>) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload.postId
          ? {
              ...post,
              like: post.like.includes(action.payload.userId)
                ? post.like.filter((id) => id !== action.payload.userId)
                : [...post.like, action.payload.userId],
            }
          : post
      );
    },
    resetPosts: (state) => {
      state.posts = []; 
    },
  },
});

export const { setPosts, addPost, toggleLike,resetPosts} = postSlice.actions;
export default postSlice.reducer;
