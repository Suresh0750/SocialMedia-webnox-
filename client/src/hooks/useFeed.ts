import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { fetchPost, postComment, toggleLike } from "@/service/postAPI";
import { useDispatch, useSelector } from "react-redux";
import { resetPosts, setPosts, toggleLike as toggleLikeAction } from "@/redux/slices/postSlice";
import { RootState } from "@/redux/store";

export const useFeed = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.posts);

  const SCROLL_DEBOUNCE_TIME = 300;

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLDivElement | null>(null);
  const userId = JSON.parse(localStorage.getItem("user") || "{}")?._id || null;
  const [sortBy, setSortBy] = useState<string>("newest");
  const limit = 5;

  // ** Fetch Posts with Pagination **
  const handleFetchPost = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      if (page === 0) dispatch(resetPosts()); // * Reset only on first page
      const res = await fetchPost(page, limit);

      if (res?.result?.length) {
        dispatch(setPosts([...posts, ...res.result]));
      } else {
        setHasMore(false); //* if the result is empty it won't make again api call
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading, dispatch, posts]);

  //* Fetch posts when `page` changes 
  useEffect(() => {
    
    handleFetchPost();
  }, [page]);

  // *Infinite Scroll Observer
  useEffect(() => {
    if (loading || !hasMore) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (lastPostRef.current) observerRef.current.observe(lastPostRef.current);

    return () => observerRef.current?.disconnect();
  }, [hasMore, loading]);

  // * Add Comment Handler 
  const handleAddComment = async (postId: string, comment: string) => {
    if (!userId) return;
    try {
      const res = await postComment({ postId, comment, userId });

      if (res?.success) {
        dispatch(
          setPosts(
            posts.map((post) =>
              post._id === postId
                ? {
                    ...post,
                    comments: [...post.comments, { postId, userId, comment }],
                  }
                : post
            )
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // * Like Toggle Handler 
  const handleLike = async (postId: string) => {
    if (!userId) return;
    try {
      const res = await toggleLike(postId, userId);

      if (res?.success) {
        dispatch(toggleLikeAction({ postId, userId }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // * Sorting Posts (Memoized)
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      switch (sortBy) {
        case "likes":
          return (b.like?.length || 0) - (a.like?.length || 0);
        case "comments":
          return (b.comments?.length || 0) - (a.comments?.length || 0);
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });
  }, [posts, sortBy]);

  return { posts: sortedPosts, loading, lastPostRef, handleAddComment, handleLike, sortBy, setSortBy };
};
