"use client";
import React, { forwardRef, useMemo } from "react";
import { FaRegComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Upvote from "./Upvote";
import Save from "./Save";
import toast from "react-hot-toast";

const PostView = forwardRef(({ title, summary, id, userId, time, upvotes, save, comment }: any, ref: any) => {
  const path = usePathname();

  function formatDate(date: any) {
    const options = {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const timePart = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

    return `${timePart} ~ ${formattedDate}`;
  }

  //memoizing the date and time calcualtion
  const formattedString = useMemo(() => {
    const date = new Date(time);
    return formatDate(date);
  }, [time]);

  const CopytoClipboard = () => {
    const reqPath = `${window.location.href}/${id}`;

    navigator.clipboard
      .writeText(reqPath)
      .then(() => {
        toast.success("Path Copied!");
      })
      .catch(() => toast.error("SOmething went wrong!"));
  };

  return (
    <main ref={ref} className=" bg-zinc-800  py-3  px-5 rounded-lg  w-full">
      <Link href={`${path}/${id}`} className=" cursor-pointer">
        <section className=" flex items-center justify-between gap-x-2 ">
          <h1 className=" font-sans text-zinc-200 text-[0.9rem] font-medium w-full line-clamp-1  flex-1">{title}</h1>
          <p className=" text-[0.8rem] italic text-zinc-500 font-mono tracking-tight ">{formattedString}</p>
        </section>

        <p className=" text-[0.8rem] mt-2 italic font-mono tracking-tight text-zinc-300  line-clamp-3 w-full ">{summary}</p>
      </Link>
      <section className=" flex items-center justify-between mt-5 text-zinc-400">
        <p className=" postView1 ">
          <FaRegComment size={15} /> {comment}
          <span className=" hidden sm:flex">Comments</span>
        </p>
        <Upvote userId={userId} postId={id} upvotes={upvotes} />
        <Save userId={userId} postId={id} saved={save} />

        <FaShare size={15} className=" hover:text-zinc-200 cursor-pointer" onClick={CopytoClipboard} />
      </section>
    </main>
  );
});

PostView.displayName = "PostView";

export default PostView;
