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
  const hasMore = useRef(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLDivElement | null>(null);
  const [userId,setUserId] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string>("newest");
  const limit = 5;


  useEffect(()=>{
    let user = localStorage.getItem('user')
    if(user){
      setUserId(JSON.parse(user)?._id)
    }else{
      setUserId(null)
    }
  },[])

  // const handleFetchPost = useCallback(async () => {
  //   if (!hasMore.current || loading) return;
  
  //   setLoading(true);
  //   try {
  //     const res = await fetchPost(page, limit);
  //     if (res?.result?.length) {
  //       dispatch(setPosts([...posts, ...res.result]));
  //     }
  //     if (res?.result?.length < limit) {
  //       hasMore.current = false;
  //     }
  //   } catch (error) {
  //     console.warn(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [page, loading, dispatch, posts]);
  

  // // ** Fetch Posts with Pagination **
  const handleFetchPost = useCallback(async () => {
    if (!hasMore.current || loading) return;

    setLoading(true);
    try {
      if (posts.length>page*limit) return; // * memorize  
      const res = await fetchPost(page, limit); 

      if (res?.result?.length) {
        dispatch(setPosts([...posts, ...res.result]));
      } 
      if(res?.result?.length<limit){  // * stop next unwanted api calls
        hasMore.current = false
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [page, hasMore.current, loading, dispatch, posts]);

  //* Fetch posts when `page` changes 
  useEffect(() => {
    
    handleFetchPost();
  }, [page]);

  // *Infinite Scroll Observer
  useEffect(() => {
    if (loading || !hasMore.current || !lastPostRef.current) return; // Ensure ref exists
  
    observerRef.current?.disconnect(); // Cleanup old observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        console.log("Observer fired", entries[0].isIntersecting);
        if (entries[0].isIntersecting && hasMore.current) {
          console.log("Fetching new posts...");
          setPage((prevPage) => prevPage + 1);
        }
      },
      { root: null, rootMargin: "100px", threshold: 0.1 }
    );
  
    console.log("Observing last post:", lastPostRef.current);
    observerRef.current.observe(lastPostRef.current);
  
    return () => observerRef.current?.disconnect(); // Cleanup
  }, [loading, posts, lastPostRef.current]);  
  

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
      console.warn(error);
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
      console.warn(error);
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
