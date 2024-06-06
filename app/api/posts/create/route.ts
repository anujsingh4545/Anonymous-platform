import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { z } from "zod";
import { AuthInfo } from "../../auth/AuthInfo";
import { redisClient } from "@/Redis";

const formData = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters long" }).max(100, { message: "Title cannot exceed 100 characters" }),
  summary: z.string().min(20, { message: "Summary must be at least 20 characters long" }).max(500, { message: "Summary cannot exceed 500 characters" }),
  // token: z.string().min(5, { message: "Please Verify First to continue." }),
});

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const prisma = new PrismaClient();
  const session = await getServerSession(AuthInfo);

  try {
    const rateLimitFlag = await redisClient.get(`RATE_LIMIT:${session.user.id}`);
    if (rateLimitFlag) {
      return Response.json({ message: "Please wait for 10 sec !", success: false });
    }

    formData.parse(body);
  } catch (error: any) {
    return Response.json({ message: error.issues[0].message, success: false });
  }

  try {
    if (!session) {
      return Response.json({ message: "Not Signed In !", success: false });
    }

    await redisClient.setex(`RATE_LIMIT:${session.user.id}`, 10, 1);

    // let formData = new FormData();
    // formData.append("secret", process.env.SECRETKEY!);
    // formData.append("response", body.token);
    // const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    // const result = await fetch(url, {
    //   body: formData,
    //   method: "POST",
    // });
    // const challengeSucceeded = (await result.json()).success;

    // console.log(challengeSucceeded);

    // if (!challengeSucceeded) {
    //   return Response.json({ message: "Invalid reCAPTCHA token" });
    // }

    await prisma.post.create({
      data: {
        title: body.title,
        summary: body.summary,
        userId: session.user.id,
      },
    });

    return Response.json({ message: "Post Created !", success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong !", success: false });
  }
};
