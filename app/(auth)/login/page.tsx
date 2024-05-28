"use client";

import AuthCommon from "@/common/AuthCommon";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa6";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const verifyUser = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    let email = e.target.email.value;
    let password = e.target.password.value;

    const data = { email, password };

    await axios
      .post("https://anonymousplatform.vercel.app/api/user/login", data)
      .then(async (response: any) => {
        if (response.data.success) {
          const res = await signIn("credentials", {
            email: email,
            redirect: false,
          });
          if (!res?.error) router.push("/"), toast.success(response.data.message);
          else toast.error("Something went wrong !");

          setLoading(false);
        } else {
          toast.error(response.data.message);
          setLoading(false);
        }
      })
      .catch((e: any) => {
        toast.error("Something went wrong !");
        setLoading(false);
      });
  };

  return (
    <main className=" flex items-center justify-center flex-col ">
      <AuthCommon data="Login to" />

      <form className=" flex flex-col items-center justify-center mt-8 w-full gap-y-3" onSubmit={verifyUser}>
        <input type="email" name="email" placeholder="Enter email id" className=" input_box1 " />
        <input type="password" placeholder="Enter password" name="password" className="input_box1 " />

        <button className=" submit_btn1 bg-zinc-700 w-full mt-5 " type="submit" disabled={loading}>
          {loading ? "Loading..." : "Continue"} <FaArrowRight />
        </button>
      </form>

      <p className=" text-[0.75rem] text-center w-full mt-5  ">
        Create your account?
        <span className=" underline underline-offset-4 font-semibold cursor-pointer ml-1  " onClick={() => signIn()}>
          Register
        </span>
      </p>
    </main>
  );
};

export default Page;
