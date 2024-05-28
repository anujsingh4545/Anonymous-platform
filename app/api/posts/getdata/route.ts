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

    const posts = await prisma.post.findUnique({
      where: {
        id: body.postId,
      },
      include: {
        upvotes: true,
        save: true,
        comment: {
          include: {
            like: true,
          },
          orderBy: {
            time: "desc",
          },
        },
      },
    });

    if (!posts) {
      return Response.json({ message: "No Post Found !", success: false });
    }

    return Response.json({ post: posts, success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong !", success: false });
  }
};
