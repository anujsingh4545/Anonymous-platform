"use client";

import Skelton from "@/common/Skelton/Skelton";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { FaArrowRight } from "react-icons/fa6";

export default function Home() {
  const session = useSession();
  const loading = useSession();

  return (
    <main className="h-full flex items-center justify-center flex-col gap-y-10">
      <section className=" border border-zinc-800 px-10 flex  items-center justify-center gap-x-5 rounded-full py-2 ">
        <Image src="/rocket.png" width={20} height={20} alt="rocket" />

        <p className=" text-[0.7rem] sm:text-[0.8rem] ">For Indian Users Only</p>
      </section>

      <p className="  w-full text-center text-[1.5rem] sm:text-[2rem] md:text-[3rem] font-bold  leading-tight ">
        Start posting anonymously <br />
        where no one will judge.
      </p>

      <p className=" text-[0.8rem] sm:text-[0.9rem] ">Welcome to Strangers discussion forum 🤌🏼</p>

      {loading.status === "loading" ? (
        <Skelton count={3} gap="gap-y-[0.6rem]" width="w-[20rem]" height="h-2" round="rounded-full" />
      ) : session.data ? (
        <Link href="/dashboard/allposts">
          <button className=" submit_btn1 sec_color">
            Go to Dashboard <FaArrowRight />
          </button>
        </Link>
      ) : (
        <section>
          <button className=" submit_btn1 sec_color" onClick={() => signIn()}>
            Create your Account <FaArrowRight />
          </button>

          <p className=" text-[0.75rem] text-center w-full mt-3 ">
            Already have account?
            <Link href="/login" className=" underline underline-offset-4 font-semibold cursor-pointer ml-1 ">
              Login
            </Link>
          </p>
        </section>
      )}
    </main>
  );
}
