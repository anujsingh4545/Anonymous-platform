"use client";
import Sidebar from "@/common/Sidebar";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [ShowNav, setShowNav] = useState(false);
  const session: any = useSession();

  return (
    <main className=" relative h-full w-full  lg:w-[80%] mx-auto   lg:pt-5 max-h-full flex ">
      <section className=" hidden lg:flex h-fit w-[40%] ">
        <Sidebar setShowNav={setShowNav} />
      </section>

      <div className=" lg:hidden absolute top-2  rounded-r-full bg-white  py-3 px-3 cursor-pointer text-black flex items-center justify-center " onClick={() => setShowNav(true)}>
        <FaBarsStaggered />
      </div>
      <section className={`absolute w-full  top-0 ease-in-out transform duration-500  lg:hidden h-[calc(100dvh-4rem)]  ${ShowNav ? " left-0" : "left-[-500rem]"} `}>
        <Sidebar setShowNav={setShowNav} />
      </section>

      <section className=" w-full lg:w-[60%] h-full bg-zinc-900 px-5  py-5 rounded-t-xl  ">{children}</section>
    </main>
  );
}
