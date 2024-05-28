import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { z } from "zod";
import { AuthInfo } from "../../auth/AuthInfo";

const formData = z.object({
  userId: z.string(),
  postId: z.string(),
  comment: z.string().min(1, { message: "Comment min length should be 1" }),
});

export const POST = async (req: NextRequest) => {
  const body = await req.json();
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

    const comment = await prisma.comments.create({
      data: {
        comment: body.comment,
        postId: body.postId,
        userId: body.userId,
      },
      include: {
        like: true,
      },
    });

    return Response.json({ message: "Comment Created !", comment, success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong !", success: false });
  }
};
