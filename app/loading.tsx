import Image from "next/image";
import React from "react";

const loading = () => {
  return (
    <div className=" w-full h-screen flex items-center justify-center">
      <Image src="/loading.gif" alt="loading" width={50} height={50} />
    </div>
  );
};

export default loading;
