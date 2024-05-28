"use client";
import { readedNotification } from "@/Recoil/slices/NotificationSlice";
import { RootState } from "@/Recoil/store";
import Box from "@/components/Notification/Box";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Notification = () => {
  const dispatch = useDispatch();
  const Notification = useSelector((atom: RootState) => atom.NotificationSlice);


  return (
    <main className=" flex  w-full flex-col h-full overflow-scroll ">
      <section className=" w-full  flex items-center justify-end ">
        <button className="  px-5 border border-zinc-700 py-[6px] rounded-full  font-mono text-[0.7rem] " onClick={() => dispatch(readedNotification())}>
          Clear All
        </button>
      </section>

      <section className=" mt-5 flex w-full flex-col gap-y-2 h-full ">
        {Notification.data.length == 0 ? (
          <div className=" w-full h-full flex items-center justify-center flex-1 flex-col ">
            <Image src="/empty.png" width={200} height={200} alt="No notification" />
            <p className=" font-mono text-[0.9rem] italic text-zinc-200 ">No new Notifications :(</p>
          </div>
        ) : (
          [...Notification.data].reverse().map((data, index) => <Box key={index} message={data.message} link={data.link} date={data.date} time={data.time} type={data.type} />)
        )}
      </section>
    </main>
  );
};

export default Notification;
