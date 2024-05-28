import React from "react";

const PostDetailSkelton = () => {
  return (
    <div className=" w-full ">
      <section className=" w-full h-60 bg-white/5 animate-pulse rounded-md "></section>

      <section className=" mt-10  h-3 w-28 rounded-md bg-white/5 animate-pulse "> </section>
      <section className=" mt-2  h-8 w-full rounded-md bg-white/5 animate-pulse "> </section>

      <div className=" flex w-full items-center justify-end mt-3 gap-x-5 ">
        <section className="   h-5 w-28 rounded-md bg-white/5 animate-pulse "> </section>
        <section className="  h-5 w-28 rounded-md bg-white/5 animate-pulse "> </section>
      </div>

      <section className=" mt-10  h-2 w-full rounded-md bg-white/5 animate-pulse "> </section>
      <section className=" mt-3  h-2 w-full rounded-md bg-white/5 animate-pulse "> </section>
      <section className=" mt-3  h-2 w-full rounded-md bg-white/5 animate-pulse "> </section>
      <section className=" mt-3  h-2 w-full rounded-md bg-white/5 animate-pulse "> </section>
      <section className=" mt-3  h-2 w-full rounded-md bg-white/5 animate-pulse "> </section>
    </div>
  );
};

export default PostDetailSkelton;
