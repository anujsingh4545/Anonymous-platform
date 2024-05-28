import Image from "next/image";
import React from "react";

const Empty = () => {
  return (
    <div className=" w-full  items-center justify-center flex  flex-1  ">
      <Image src="/empty.png" alt="empty" width={300} height={300} />
    </div>
  );
};

export default Empty;
