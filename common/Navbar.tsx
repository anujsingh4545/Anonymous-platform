"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import Skelton from "./Skelton/Skelton";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "@/Recoil/slices/NotificationSlice";
import { IoNotifications } from "react-icons/io5";
import { RootState } from "@/Recoil/store";

const Navbar = () => {
  const session: any = useSession();
  const loading: any = useSession();
  const dispatch = useDispatch();
  const Notification = useSelector((atom: RootState) => atom.NotificationSlice);

  useEffect(() => {
    const socket = io("https://anonymous-platform-backend.onrender.com");
    socket.on(`${session?.data?.user.id}upvote`, (d: any) => {
      console.log(d);
      const { postId, userId, upvoterId, time, date, vote } = d;
      const message = `Someone ${vote ? "Upvoted" : "Devoted"} your post !`;
      const link = `/dashboard/myposts/${postId}`;
      const type = vote ? "Upvote" : "Devote";
      const data = { message, link, time, date, type };
      dispatch(addNotification({ data }));
    });
    socket.on(`${session?.data?.user.id}comment`, (d: any) => {
      console.log(d);
      const { postId, userId, comment, time, date } = d;
      const message = `Someone Commented on your post ~ ${comment} !`;
      const link = `/dashboard/myposts/${postId}`;
      const type = "Comment";
      const data = { message, link, time, date, type };
      dispatch(addNotification({ data }));
    });
    socket.on(`${session?.data?.user.id}Dcomment`, (d: any) => {
      console.log(d);
      const { postId, userId, comment, time, date } = d;
      const message = `Someone Deleted comment on your post ~ ${comment} !`;
      const link = `/dashboard/myposts/${postId}`;
      const type = "DComment";
      const data = { message, link, time, date, type };
      dispatch(addNotification({ data }));
    });

    return () => {
      socket.disconnect();
    };
  }, [session]);

  return (
    <div className=" w-full  h-16 max-w-[90rem] mx-auto flex items-center justify-between  px-3 md:px-10 ">
      <Link href="/" className=" flex items-center justify-center  gap-x-3 md:gap-x-5 cursor-pointer ">
        <Image src="/logo.png" alt="logo" width={30} height={30} />
        <h1 className="  font-bold">ANONYMOUS</h1>
      </Link>

      {loading.status === "loading" ? (
        <Skelton count={2} gap="gap-y-[0.8rem]" width="w-[10rem]" height="h-2" round="rounded-full" />
      ) : (
        <section className=" flex pl-3 md:pl-5 pr-1 py-1 bg-zinc-900 rounded-full max-w-[12rem] md:max-w-fit gap-x-3  items-center justify-center ">
          {session.data ? (
            <>
              <Link href="/dashboard/notification">
                <div className=" cursor-pointer relative">
                  <IoNotifications size={20} className=" relative" />
                  <p className=" absolute top-[-5px] right-[-5px] rounded-full size-4 text-[0.6rem] flex items-center justify-center bg-red-700 animate-bounce "> {Notification.count} </p>
                </div>
              </Link>
              <p className="text-[0.8rem]  line-clamp-1  font-semibold text-zinc-200 ">{session.data.user.username}</p>
              <div className=" bg-black text-zinc-200  flex items-center justify-center rounded-full cursor-pointer" onClick={() => signOut()}>
                <IoMdLogOut size={15} className=" m-2 " />
              </div>
            </>
          ) : (
            <p className="text-[0.8rem] max-w-[7rem] line-clamp-1  pr-4 py-2 cursor-pointer font-semibold text-zinc-200" onClick={() => signIn()}>
              Sign In
            </p>
          )}
        </section>
      )}
    </div>
  );
};

export default Navbar;
