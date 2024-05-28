import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/common/Navbar";
import { Providers } from "@/common/Providers";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/Recoil/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anonymous Platform",
  description: "Platform to post anonymously!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Providers>
            <Toaster />
            <Navbar />
            <section className=" h-[calc(100dvh-4rem)] w-full  ">{children}</section>
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
