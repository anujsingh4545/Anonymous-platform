"use client";
import CommentSection from "@/components/Comments/CommentSection";
import axios, { AxiosError, AxiosResponse } from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegComment, FaShare } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import PostDetailSkelton from "../../common/Skelton/PostDetailSkelton";
import Upvote from "@/components/Posts/Upvote";
import Save from "@/components/Posts/Save";
import { useSession } from "next-auth/react";
import Empty from "@/common/Empty";
import { useSelector } from "react-redux";
import { RootState } from "@/Recoil/store";

const PostDetail = () => {
  const path = usePathname();
  const [loading, setLoading] = useState(true);
  const [delPost, setdelPost] = useState(false);
  const [data, setData] = useState<any>();
  const pathsplit = path.split("/");
  const postId = pathsplit[pathsplit.length - 1];
  const session: any = useSession();
  const router = useRouter();

  function formatDate(time: string) {
    const date: any = new Date(time);

    const options = {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const timePart = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

    return `${timePart} ~ ${formattedDate}`;
  }

  useEffect(() => {
    const fetchData = async (postId: string) => {
      await axios
        .post("https://anonymousplatform.vercel.app/api/posts/getdata", { postId })
        .then((res: AxiosResponse) => {
          if (res.data.success) {
            setData(res.data.post);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((e: AxiosError) => {
          toast.error("Something went wrong !");
        })
        .finally(() => setLoading(false));
    };

    if (postId) fetchData(postId);
  }, []);

  const CopytoClipboard = () => {
    const reqPath = window.location.href;

    navigator.clipboard
      .writeText(reqPath)
      .then(() => {
        toast.success("Path Copied!");
      })
      .catch(() => toast.error("SOmething went wrong!"));
  };

  const DeletePost = async () => {
    setdelPost(true);
    await axios
      .post("https://anonymousplatform.vercel.app/api/posts/delete", { postId: data.id })
      .then((res: AxiosResponse) => {
        if (res.data.success) {
          router.replace(path.replace(`/${postId}`, ""));
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e: AxiosError) => {
        toast.error("Something went wrong !");
      })
      .finally(() => setdelPost(false));
  };

  return loading ? (
    <PostDetailSkelton />
  ) : !data ? (
    <main className=" w-full h-full flex items-center justify-center ">
      <Empty />
    </main>
  ) : (
    <main className="overflow-scroll max-h-full  scrollbar-none">
      <div className=" bg-zinc-800  py-3  px-5 rounded-lg ">
        <section className=" flex flex-col items-center justify-between gap-x-2 ">
          <p className=" text-[0.8rem] italic text-zinc-500 font-mono tracking-tight w-full text-right ">{formatDate(data.time)}</p>
          <h1 className=" my-2 font-sans text-zinc-200 text-[0.9rem] font-medium w-full ">{data.title}</h1>
        </section>

        <p className=" text-[0.8rem] mt-2 italic font-mono tracking-tight text-zinc-300 ">{data.summary}</p>

        <section className=" flex items-center justify-between mt-5 text-zinc-400">
          <p className=" postView1 ">
            <FaRegComment size={15} className=" cursor-pointer " /> {data.comment.length}
            <span className=" hidden sm:flex">Comments</span>
          </p>
          <Upvote userId={data.userId} postId={data.id} upvotes={data.upvotes} />
          <Save userId={data.userId} postId={data.id} saved={data.save} />

          <FaShare size={15} className=" hover:text-zinc-200 cursor-pointer" onClick={CopytoClipboard} />

          {data.userId == session.data.user.id && (
            <button className="outline-none" onClick={DeletePost} disabled={delPost}>
              <MdDelete size={15} className=" hover:text-zinc-200  " />
            </button>
          )}
        </section>
      </div>

      {/* Comment section */}

      <CommentSection userId={data.userId} postId={data.id} comment={data.comment} setData={setData} />
    </main>
  );
};

export default PostDetail;
