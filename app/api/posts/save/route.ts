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

    const checkSaved = await prisma.saved.findFirst({
      where: {
        userId: body.userId,
        postId: body.postId,
      },
    });

    if (checkSaved) {
      await prisma.saved.deleteMany({
        where: {
          userId: body.userId,
          postId: body.postId,
        },
      });
      return Response.json({ message: "Removed from Saved !", success: true, removed: true });
    } else {
      const data = await prisma.saved.create({
        data: {
          postId: body.postId,
          userId: body.userId,
        },
      });

      return Response.json({ message: "Added to Saved !", data, success: true, removed: false });
    }
  } catch (error) {
    return Response.json({ message: "Something went wrong !", success: false });
  }
};
