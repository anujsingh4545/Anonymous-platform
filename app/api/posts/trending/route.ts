import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { AuthInfo } from "../../auth/AuthInfo";

export const GET = async (req: NextRequest) => {
  const prisma = new PrismaClient();
  const session = await getServerSession(AuthInfo);

  try {
    if (!session) {
      return Response.json({ message: "Not Signed In !", success: false });
    }

    const posts = await prisma.post.findMany({
      include: {
        upvotes: true,
        save: true,
        comment: true,
      },
      orderBy: [
        {
          upvotes: {
            _count: "desc",
          },
        },
        {
          comment: {
            _count: "desc",
          },
        },
        {
          time: "desc",
        },
      ],
      take: 5,
    });
    return Response.json({ posts: posts, success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong !", success: false });
  }
};
