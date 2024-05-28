"use client";
import { updatePost } from "@/Recoil/slices/SavedPostSlice";
import { RootState } from "@/Recoil/store";
import Empty from "@/common/Empty";
import Skelton from "@/common/Skelton/Skelton";
import PostView from "@/components/Posts/PostView";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const post: any = useSelector((state: RootState) => state.SavedPostSlice);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      if (post.rendered && !post.reload) return;
      setLoading(true);
      await axios
        .get("https://anonymousplatform.vercel.app/api/user/saved")
        .then(async (res: any) => {
          if (res.data.success) {
            dispatch(updatePost(res.data.posts));
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
      {loading ? (
        <Skelton count={5} gap="gap-y-[0.5rem]" width="w-full" height="h-32" round="rounded-md" />
      ) : post.posts.length == 0 ? (
        <Empty />
      ) : (
        post.posts.map((post: any) => <PostView key={post.id} id={post.post.id} title={post.post.title} summary={post.post.summary} userId={post.post.userId} time={post.post.time} upvotes={post.post.upvotes} save={post.post.save} comment={post.post.comment.length} />)
      )}
    </main>
  );
};

export default Page;
