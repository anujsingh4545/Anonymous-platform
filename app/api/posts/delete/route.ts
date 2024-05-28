import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { z } from "zod";
import { AuthInfo } from "../../auth/AuthInfo";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const prisma = new PrismaClient();
  const session = await getServerSession(AuthInfo);

  try {
    if (!session) {
      return Response.json({ message: "Not Signed In !", success: false });
    }

    await prisma.saved.deleteMany({
      where: {
        postId: body.postId,
      },
    });

    await prisma.comments.deleteMany({
      where: {
        postId: body.postId,
      },
    });

    await prisma.upvote.deleteMany({
      where: {
        postId: body.postId,
      },
    });

    await prisma.likes.deleteMany({
      where: {
        commentsId: null,
      },
    });
    await prisma.post.delete({
      where: {
        id: body.postId,
      },
    });

    return Response.json({ message: "Post Deleted !", success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong !", success: false });
  }
};
