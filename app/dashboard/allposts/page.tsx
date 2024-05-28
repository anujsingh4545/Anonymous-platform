"use client";

import Skelton from "@/common/Skelton/Skelton";
import PostView from "@/components/Posts/PostView";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const Page = () => {
  const [post, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef: any = useRef();
  const initialRender = useRef(true);
  const [newFileCount, setNewFileCount] = useState(0);

  useEffect(() => {
    const socket = io("https://anonymous-platform-backend.onrender.com");
    socket.on("newFile", () => {
      console.log("got new file");
      setNewFileCount((prevCount) => {
        return prevCount + 1;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchPosts = useCallback(
    async (cursor: any) => {
      if (loading || !hasMore) return;

      setLoading(true);

      await axios
        .get(`https://anonymousplatform.vercel.app/api/posts/getall?cursor=${cursor}&limit=5`)
        .then(async (res: any) => {
          const data: any = res.data.posts;
          if (res.data.posts.length > 0) {
            setPosts((prev: any) => [...prev, ...data]);
            // setPosts(data);
            setCursor(res.data.posts[res.data.posts.length - 1].id);
            if (res.data.posts.length < 5) setHasMore(false); // No more posts if fetched less than limit
          } else {
            setHasMore(false);
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => setLoading(false));
    },
    [loading, cursor, hasMore]
  );

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      fetchPosts(cursor);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];

      if (target.isIntersecting) {
        fetchPosts(cursor);
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchPosts]);

  const RecallNew = () => {
    setNewFileCount(0);
    setPosts([]);
    setCursor(null);
    setHasMore(true);
    fetchPosts(null);
  };

  return (
    <main className="flex flex-col gap-y-5 overflow-scroll max-h-full  items-center  w-full  scrollbar-none  ">
      <button onClick={RecallNew} className={` top-8 ease-in-out duration-150 transform italic font-mono text-[0.8rem] bg-white text-black px-4 cursor-pointer py-1 rounded-full outline-none z-10 ${newFileCount > 0 ? "absolute" : "hidden"}`}>
        {newFileCount} New Posts
      </button>
      {post.map((post: any) => (
        <PostView ref={post.id == cursor ? loaderRef : null} key={post.id} id={post.id} title={post.title} summary={post.summary} userId={post.userId} time={post.time} upvotes={post.upvotes} save={post.save} comment={post.comment?.length} />
      ))}

      {loading && <Skelton count={5} gap="gap-y-[0.5rem]" width="w-full" height="h-32" round="rounded-md" />}
    </main>
  );
};

export default Page;
