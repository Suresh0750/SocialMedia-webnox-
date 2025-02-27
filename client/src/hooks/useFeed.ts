import { useEffect, useState, useRef } from "react";
import { fetchPost } from "@/service/postAPI";

export const useFeed = () => {
  const [postData, setPostData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLDivElement | null>(null);

  const handleFetchPost = async () => {
    if (!hasMore) return; // Stop fetching if no more posts
    try {
      setLoading(true);
      const res = await fetchPost(page, limit);
      if (res?.result?.length) {
        setPostData((prevPosts) => [...prevPosts, ...res.result]);
      } else {
        setHasMore(false); // No more posts to fetch
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchPost();
  }, [page]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (lastPostRef.current) {
      observerRef.current.observe(lastPostRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [postData, hasMore, loading]);

  return { postData, loading, lastPostRef };
};
