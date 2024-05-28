"use client";
import { callReload } from "@/Recoil/slices/SavedPostSlice";
import { RootState } from "@/Recoil/store";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import { BiSolidUpvote, BiUpvote } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

interface UpvoteProps {
  userId: string;
  postId: string;
  upvotes: any;
}

const checkUserVote = (upvotes: any[], userId: string): boolean => {
  if (!userId) return false;

  for (const vote of upvotes) {
    if (vote.userId === userId) {
      return true;
    }
  }

  return false;
};

const Upvote = ({ userId, postId, upvotes }: UpvoteProps) => {
  const dispatch = useDispatch();
  const [hasVoted, setHasVoted] = useState(false);
  const [upVoteLen, setUpVoteLen] = useState(upvotes?.length || 0);
  const [loading, setLoading] = useState(false);
  const session: any = useSession();
  const [socket, setSocket] = useState<any>(null);

  const userHasVoted: any = useMemo(() => checkUserVote(upvotes, session.data.user.id), [upvotes, session]);

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

  useEffect(() => {
    setHasVoted(userHasVoted);
  }, [userHasVoted]);

  const ManageUpvote = async () => {
    hasVoted ? setUpVoteLen(upVoteLen - 1) : setUpVoteLen(upVoteLen + 1);
    setHasVoted(!hasVoted);
    setLoading(true);

    dispatch(callReload());

    await axios
      .post("https://anonymousplatform.vercel.app/api/posts/upvote", { userId: session.data.user.id, postId })
      .then(() => {
        const vote = !hasVoted;
        if (userId != session.data.user.id) socket.emit("upvote", { userId, postId, vote, upvoterId: session.data.user.id });
      })
      .catch((e: any) => {
        setHasVoted(!hasVoted);
        setUpVoteLen(hasVoted ? upVoteLen : upVoteLen - 1);
      })
      .finally(() => setLoading(false));
  };

  return (
    <button className=" outline-none postView1" onClick={ManageUpvote} disabled={loading}>
      {hasVoted ? (
        <>
          <BiSolidUpvote size={15} className=" text-white" />{" "}
          <p className="flex">
            {upVoteLen} <span className="hidden sm:flex">Upvote</span>
          </p>
        </>
      ) : (
        <>
          <BiUpvote size={15} />{" "}
          <p className="flex">
            {upVoteLen} <span className="hidden sm:flex">Upvote</span>
          </p>
        </>
      )}
    </button>
  );
};

export default Upvote;
