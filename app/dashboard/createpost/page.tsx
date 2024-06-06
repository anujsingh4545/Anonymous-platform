"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Turnstile } from "@marsidev/react-turnstile";

import { io } from "socket.io-client";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState<any>(null);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const socket = io("https://anonymous-platform-backend.onrender.com");

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  const CreatePost = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      title: e.target.title.value,
      summary: e.target.summary.value,
      token,
    };

    await axios
      .post("https://anonymousplatform.vercel.app/api/posts/create", data)
      .then((response: any) => {
        if (response.data.success) {
          toast.success(response.data.message);
          socket.emit("newFile", {});
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((e: any) => {
        toast.error("Something went wrong !");
      })
      .finally(() => {
        e.target.title.value = "";
        e.target.summary.value = "";
        setLoading(false);
      });
  };

  return (
    <form className=" flex flex-col w-full " onSubmit={CreatePost}>
      <textarea name="title" className="textarea1" rows={2} placeholder="Enter post title..." />
      <textarea name="summary" className="textarea1 mt-5" rows={8} placeholder="Describe your post..." />

      <section className=" mt-5  flex items-center justify-start ">
        <Turnstile onSuccess={(token) => setToken(token)} siteKey="0x4AAAAAAAbZDat37Ruwesr_" />
      </section>

      <section className=" flex w-full items-center justify-end gap-x-3 text-[0.8rem] font-mono mt-5  ">
        <button type="reset" className=" text-zinc-300 px-10 py-2 rounded-full hover:bg-zinc-700" disabled={loading}>
          Cancel
        </button>
        <button type="submit" className="  bg-zinc-300 text-black px-10 py-2 rounded-full" disabled={loading}>
          {loading ? "loading..." : "Submit"}
        </button>
      </section>
    </form>
  );
};

export default Page;
