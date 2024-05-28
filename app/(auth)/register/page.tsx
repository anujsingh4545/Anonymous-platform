"use client";

import AuthCommon from "@/common/AuthCommon";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa6";

const Page = () => {
  const [OtpSection, setOtpSection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const router = useRouter();

  const TriggerOtpCall = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    let name = e.target.name.value;
    let email = e.target.email.value;
    let password = e.target.password.value;

    const data = { name, email, password };
    setData(data);

    await axios
      .post("https://anonymousplatform.vercel.app/api/user/register/otp", data)
      .then((response: any) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setOtpSection(true);
          setLoading(false);
        } else toast.error(response.data.message), setLoading(false);
      })
      .catch((e: any) => {
        toast.error("Something went wrong !");
        setLoading(false);
      });
  };

  const VerifyOtp = async (e: any) => {
    e.preventDefault();
    const otp = e.target.OTP.value;

    setLoading(true);

    await axios
      .post("https://anonymousplatform.vercel.app/api/user/register", { otp: otp, email: data.email })
      .then(async (response: any) => {
        if (response.data.success) {
          toast.success(response.data.message);

          const res = await signIn("credentials", {
            email: data.email,
            redirect: false,
          });
          if (!res?.error) router.push("/"), toast.success("Welcome to anonymous !");
          else toast.error("Something went wrong !");

          setLoading(false);
        } else {
          toast.error(response.data.message);
          setLoading(false);
        }
      })
      .catch((e) => {
        toast.error("Something went wrong!");
        setLoading(false);
      });
  };

  return (
    <main className=" flex items-center justify-center flex-col ">
      <AuthCommon data="Create" />

      {!OtpSection ? (
        <form className=" flex flex-col items-center justify-center mt-8 w-full gap-y-3" onSubmit={TriggerOtpCall}>
          <input type="name" name="name" placeholder="Enter your name" className=" input_box1 " />
          <input type="email" name="email" placeholder="Enter email id" className=" input_box1 " />
          <input type="password" placeholder="Enter password" name="password" className="input_box1 " />

          <button className=" submit_btn1 bg-zinc-700 w-full mt-5" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Continue"} <FaArrowRight />
          </button>
        </form>
      ) : (
        <form className=" mt-8 w-full" onSubmit={VerifyOtp}>
          <p className=" text-[0.8rem]   text-zinc-500 font-medium text-center   ">
            Please verify your email ID to continue.
            <br /> We have sent an OTP to your mail.
          </p>

          <input type="number" name="OTP" placeholder="Enter OTP" className=" mt-6 input_box1 " />

          <button className=" submit_btn1 bg-zinc-700 w-full mt-5" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Continue"} <FaArrowRight />
          </button>
        </form>
      )}

      <p className=" text-[0.75rem] text-center w-full mt-5 ">
        Already have account?
        <Link href="/login" className=" underline underline-offset-4 font-semibold cursor-pointer ml-1 ">
          Login
        </Link>
      </p>
    </main>
  );
};

export default Page;
