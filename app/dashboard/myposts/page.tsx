"use client";
import Empty from "@/common/Empty";
import Skelton from "@/common/Skelton/Skelton";
import PostView from "@/components/Posts/PostView";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [post, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      await axios
        .get("https://anonymousplatform.vercel.app/api/posts/getmine")
        .then(async (res: any) => {
          if (res.data.success) {
            setPosts(res.data.posts);
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => setLoading(false));
    };

    fetchPosts();
  }, []);

  return (
    <main className="flex flex-col gap-y-5 overflow-scroll max-h-full h-full  scrollbar-none ">
      {loading ? <Skelton count={5} gap="gap-y-[0.5rem]" width="w-full" height="h-32" round="rounded-md" /> : post.length == 0 ? <Empty /> : post.map((post: any) => <PostView key={post.id} id={post.id} title={post.title} summary={post.summary} userId={post.userId} time={post.time} upvotes={post.upvotes} save={post.save} comment={post.comment.length} />)}
    </main>
  );
};

export default Page;
