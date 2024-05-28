export default function layout({children}: {children: React.ReactNode}) {
  return (
    <main className=" h-full flex items-center justify-center">
      <section className=" sec_color rounded-xl w-[90%] sm:w-[60%] md:w-[45%] lg:w-[30%]  px-10 pt-16 pb-10 ">{children}</section>
    </main>
  );
}
