"use client";
import { callReload } from "@/Recoil/slices/SavedPostSlice";
import { deleteComment } from "@/common/functions";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { BiDislike, BiLike } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import LikeDislikeComment from "./LikeDislikeComment";
import { io } from "socket.io-client";
import { strict } from "assert";

interface UserCommentProps {
  id: string;
  comment: string;
  userId: string;
  postId: string;
  time: Date;
  likeDislike: any[];

  setData: any;
  postUserid: string;
}

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

const UserCommets = ({ id, comment, userId, postId, time, likeDislike, setData, postUserid }: UserCommentProps) => {
  const session: any = useSession();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const socket = io("https://anonymous-platform-backend.onrender.com");
    setSocket(socket);
    socket.on("connect", () => {
      console.log("connected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const formattedString = useMemo(() => {
    const date = new Date(time);
    return formatDate(date);
  }, [time]);

  const DeleteComment = async () => {
    setLoading(true);
    await axios
      .post("https://anonymousplatform.vercel.app/api/posts/delcomment", { id })
      .then((res: AxiosResponse) => {
        if (res.data.success) {
          deleteComment(id, setData);
          console.log(postUserid , session.data.user.id)
          if (postUserid != session.data.user.id) socket.emit("Dcomment", { userId: postUserid, postId, comment });
          dispatch(callReload());
          toast.success(res.data.message);
        }
      })
      .catch((e: AxiosError) => {
        toast.error("Something went wrong !");
      })
      .finally(() => setLoading(false));
  };

  return (
    <main className="w-full font-mono ">
      <div className=" flex justify-between ">
        <section className=" flex gap-x-3 ">
          <h4 className="  text-[0.8rem] ">@anonymous</h4>
          <p className=" text-[0.8rem] italic text-zinc-500  tracking-tight ">{formattedString}</p>
        </section>
        {userId == session.data.user.id && (
          <button onClick={DeleteComment} disabled={loading}>
            <MdDelete size={15} className=" hover:text-zinc-200  text-zinc-500 "></MdDelete>
          </button>
        )}
      </div>
      <p className=" text-[0.75rem] italic text-zinc-300  tracking-tight ">{comment}</p>
      <div className=" flex items-center justify-start mt-1 gap-x-5 ">
        <LikeDislikeComment likeDislike={likeDislike} userId={userId} postId={postId} id={id} setData={setData} />
      </div>
    </main>
  );
};

export default UserCommets;
