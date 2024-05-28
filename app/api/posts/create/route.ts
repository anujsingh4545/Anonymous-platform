import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { z } from "zod";
import { AuthInfo } from "../../auth/AuthInfo";

const formData = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters long" }).max(100, { message: "Title cannot exceed 100 characters" }),
  summary: z.string().min(20, { message: "Summary must be at least 20 characters long" }).max(500, { message: "Summary cannot exceed 500 characters" }),
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
