import Link from "next/link";
import React from "react";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { FaComment, FaCommentSlash } from "react-icons/fa6";

const Box = ({ message, link, date, time, type }: any) => {

  return (
    <main className=" w-full  bg-black px-3 py-2  rounded-md flex flex-col ">
      <Link href={link}>
        <section className=" w-full flex items-center justify-end gap-x-3 text-[0.6rem] text-zinc-500 font-mono italic tracking-tight ">
          <p>{time}</p>
          <p>{date}</p>
        </section>

        <section className=" flex items-center gap-x-3  w-full">
          <div className=" p-2 bg-zinc-800  rounded-full flex items-center justify-center">
            {type == "Comment" && <FaComment size={15} className=" text-zinc-300 " />}
            {type == "DComment" && <FaCommentSlash size={15} className=" text-zinc-300 " />}
            {type == "Upvote" && <BiSolidUpvote size={15} className=" text-zinc-300 " />}
            {type == "Devote" && <BiSolidDownvote size={15} className=" text-zinc-300 " />}
          </div>

          <p className=" flex-1 text-[0.7rem] mt-1 md:text-[0.8rem] text-zinc-200 font-mono tracking-normal italic">{message}</p>
        </section>
      </Link>
    </main>
  );
};

export default Box;
