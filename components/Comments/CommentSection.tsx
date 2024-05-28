"use client";

import React, { useEffect, useState } from "react";
import UserCommets from "./UserCommets";
import axios, { AxiosError, AxiosResponse } from "axios";
import { setComment } from "@/common/functions";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { callReload } from "@/Recoil/slices/SavedPostSlice";
import { io } from "socket.io-client";
import { useSession } from "next-auth/react";

interface CommentProps {
  userId: string;
  postId: string;
  comment: any;
  setData: any;
}

const CommentSection = ({ userId, postId, comment, setData }: CommentProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState<any>(null);
  const session: any = useSession();

  useEffect(() => {
    const socket = io("https://anonymous-platform-backend.onrender.com/");
    setSocket(socket);
    socket.on("connect", () => {
      console.log("connected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const AddComment = async (event: any) => {
    event.preventDefault();
    const comm: any = event.target.comment.value;
    setLoading(true);

    await axios
      .post("https://anonymousplatform.vercel.app/api/posts/addcomment", { comment: comm, userId: session.data.user.id, postId })
      .then((res: AxiosResponse) => {
        if (res.data.success) {
          toast.success("Comment Added !");
          if (userId != session.data.user.id) socket.emit("comment", { userId, postId, comment: res.data.comment.comment });
          dispatch(callReload());
          setComment(setData, res.data);
          event.target.comment.value = "";
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e: AxiosError) => {
        toast.error("Something went wrong !");
      })
      .finally(() => setLoading(false));
  };

  return (
    <main className=" mt-10 w-full ">
      <h3 className=" text-[0.8rem] ">{comment.length} Comments</h3>

      <form className=" flex items-center flex-col w-full justify-center mt-5" onSubmit={AddComment}>
        <input type="text" placeholder="Add a comment..." name="comment" className="bg-transparent placeholder:text-zinc-400 text-[0.8rem] italic font-mono w-full border-b border-zinc-700 pb-1 outline-none " />

        <section className=" flex w-full items-center justify-end gap-x-3 text-[0.8rem] font-mono mt-3  ">
          <button type="reset" className=" text-zinc-300 px-5 py-2 rounded-full hover:bg-zinc-700" disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="  bg-zinc-300 text-black px-5 py-2 rounded-full" disabled={loading}>
            {loading ? "......." : "Comment"}
          </button>
        </section>
      </form>

      {/* users Commments */}

      <section className=" mt-10 flex w-full flex-col  gap-y-4">
        {comment.map((c: any) => {
          return <UserCommets key={c.id} id={c.id} comment={c.comment} userId={c.userId} postId={c.postId} time={c.time} likeDislike={c.like} setData={setData} postUserid={userId} />;
        })}
      </section>
    </main>
  );
};

export default CommentSection;
