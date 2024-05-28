import React from "react";

const Skelton = ({ count = 2, gap,  width, height, round= "rounded-full"  } : { count : number, gap:string, width: string, height:string, round:string } ) => {
  const skeletonSections = [];

  for (let i = 0; i < count; i++) {
    skeletonSections.push(<section key={i} className={`animate-pulse bg-white/10 ${round} ${height} w-full`}></section>);
  }

  return <div className={`flex flex-col items-center  justify-center ${width}  ${gap}`}>{skeletonSections}</div>;
};

export default Skelton;
