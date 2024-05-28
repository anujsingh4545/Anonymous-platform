import Image from "next/image";
import React from "react";

const AuthCommon = ({data}: {data: string}) => {
  return (
    <div className=" w-full  flex flex-col items-center justify-center gap-y-3 ">
      <Image src="/rocket.png" alt="rocket" width={25} height={25} />
      <h2 className=" font-semibold text-[1.2rem] ">{data} your Account</h2>
    </div>
  );
};

export default AuthCommon;
