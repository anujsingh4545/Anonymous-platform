import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { z } from "zod";
import { AuthInfo } from "../../auth/AuthInfo";
import { PrismaClient } from "@prisma/client";

const formData = z.object({
  userId: z.string(),
  postId: z.string(),
});

export const POST = async (Request: NextRequest) => {
  const body = await Request.json();
  const prisma = new PrismaClient();
  const session = await getServerSession(AuthInfo);

  try {
    formData.parse(body);
  } catch (error: any) {
    return Response.json({ message: error.issues[0].message, success: false });
  }

  try {
    if (!session) {
      return Response.json({ message: "Not Signed In !", success: false });
    }

    const checkUpvote = await prisma.upvote.findFirst({
      where: {
        userId: body.userId,
        postId: body.postId,
      },
    });

    if (checkUpvote) {
      await prisma.upvote.deleteMany({
        where: {
          userId: body.userId,
          postId: body.postId,
        },
      });
      return Response.json({ message: "Removed Upvote !", success: true, removed: true });
    } else {
      const data = await prisma.upvote.create({
        data: {
          postId: body.postId,
          userId: body.userId,
        },
      });

      return Response.json({ message: "Added Upvote !", data, success: true, removed: false });
    }
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong !", success: false });
  }
};
