"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";

const Sidebar = ({ setShowNav }: { setShowNav: Dispatch<SetStateAction<boolean>> }) => {
  const [SelTab, setSelTab] = useState(0);
  const path = usePathname();

  const tabs = [
    { name: "All Posts", key: 1, href: "/dashboard/allposts" },
    { name: "Trending Posts", key: 2, href: "/dashboard/trending" },
    { name: "Saved Posts", key: 3, href: "/dashboard/saved" },
    { name: "My Posts", key: 4, href: "/dashboard/myposts" },
  ];

  useEffect(() => {
    const selectedTab = tabs.find((tab) => path.includes(tab.href));
    if (selectedTab) setSelTab(selectedTab.key);
    else setSelTab(0);
  }, [path]);

  return (
    <main className=" w-full h-full  flex  ">
      <section className=" bg-black h-full py-5 w-[80%] lg:w-full  flex flex-col items-center justify-start px-6 lg:px-20 gap-y-5 ">
        {tabs.map((tab) => {
          return (
            <Link href={tab.href} key={tab.key} className="w-full relative">
              <button className={`sidebar_btn1   ${SelTab === tab.key ? " bg-zinc-700 font-bold text-white" : "sec_color font-normal text-zinc-400  "} `}>{tab.name}</button>
            </Link>
          );
        })}

        <Link href="/dashboard/createpost" className="w-full">
          <button className=" w-full border rounded-lg border-zinc-600 text-zinc-400 py-4 mt-8 text-[0.9rem] flex gap-x-5 items-center justify-center hover:border-zinc-500 ">
            <IoAddCircleOutline size={20} />
            Create Post
          </button>
        </Link>
      </section>

      <section className=" w-[20%] lg:hidden  bg-white/5 h-full bg" onClick={() => setShowNav(false)}></section>
    </main>
  );
};

export default Sidebar;
