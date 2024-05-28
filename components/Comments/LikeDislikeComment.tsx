"use client";
import { call } from "@/common/functions";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";

const LikeDislikeComment = ({ likeDislike, id, userId, postId, setData }: any) => {
  const [LikeDislike, setLikeDislike] = useState("None");
  const [Likeid, setLikeId] = useState("");
  const session: any = useSession();
  const [count, setCount] = useState({ liked: 0, disliked: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateData = async () => {
      setLoading(true);
      let liked = 0,
        disliked = 0;
      setLikeId("");

      likeDislike.forEach((data: any) => {
        if (data.userId === session.data.user.id) {
          if (data.LikeDislike === "Like") setLikeDislike("Like");
          else if (data.LikeDislike === "Dislike") setLikeDislike("Dislike");

          setLikeId(data.id);
        }
        if (data.LikeDislike == "Like") liked++;
        if (data.LikeDislike == "Dislike") disliked++;
      });

      setCount({ liked: liked, disliked: disliked });
      setLoading(false);
    };

    if (likeDislike) updateData();
  }, [likeDislike]);

  const ManageLikeDislike = async (option: string) => {
    if (LikeDislike === "Like" && option == "Like") {
      await call(session.data.user.id, id, Likeid, setLoading, setData, "None");
      setLikeDislike("None");

      //
    } else if ((LikeDislike == "None" || LikeDislike == "Dislike") && option == "Like") {
      await call(session.data.user.id, id, Likeid, setLoading, setData, "Like");
      setLikeDislike("Like");

      //
    } else if (LikeDislike === "Dislike" && option == "Dislike") {
      await call(session.data.user.id, id, Likeid, setLoading, setData, "None");
      setLikeDislike("None");

      //
    } else if ((LikeDislike == "None" || LikeDislike == "Like") && option == "Dislike") {
      await call(session.data.user.id, id, Likeid, setLoading, setData, "Dislike");
      setLikeDislike("Dislike");

      //
    }
  };

  return (
    <section className=" flex gap-x-2 ">
      <button className=" flex gap-x-1 text-zinc-500 text-[0.7rem] " disabled={loading}>
        {LikeDislike === "Like" ? <BiSolidLike size={18} className=" text-zinc-200  hover:text-zinc-300 " onClick={() => ManageLikeDislike("Like")} /> : <BiLike size={18} className="  hover:text-zinc-300 " onClick={() => ManageLikeDislike("Like")} />}
        <p>{count.liked}</p>
      </button>
      <button className=" flex gap-x-1 text-zinc-500 text-[0.7rem] " disabled={loading}>
        {LikeDislike === "Dislike" ? <BiSolidDislike size={18} className="  text-zinc-200 hover:text-zinc-300" onClick={() => ManageLikeDislike("Dislike")} /> : <BiDislike size={18} className="  hover:text-zinc-300" onClick={() => ManageLikeDislike("Dislike")} />}
        {count.disliked}
      </button>
    </section>
  );
};

export default LikeDislikeComment;
