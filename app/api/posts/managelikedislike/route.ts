import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { AuthInfo } from "../../auth/AuthInfo";

export const POST = async (req: NextRequest) => {
  const prisma = new PrismaClient();
  const session = await getServerSession(AuthInfo);
  const body = await req.json();

  try {
    if (!session) {
      return Response.json({ message: "Not Signed In !", success: false });
    }

    if (body.choosed == "None" && body.Likeid.length > 0) {
      await prisma.likes.delete({
        where: {
          id: body.Likeid,
        },
      });
    } else if (body.Likeid.length === 0) {
      await prisma.likes.create({
        data: {
          userId: body.userId,
          commentsId: body.id,
          LikeDislike: body.choosed,
        },
      });
    } else {
      console.log(body.Likeid);
      await prisma.likes.update({
        where: {
          id: body.Likeid,
        },
        data: {
          LikeDislike: body.choosed,
        },
      });
    }

    const data = await prisma.comments.findUnique({
      where: {
        id: body.id,
      },
      include: {
        like: true,
      },
    });

    return Response.json({ message: "Sucess Updated !", data, success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong !", success: false });
  }
};
