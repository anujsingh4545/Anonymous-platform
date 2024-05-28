import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { z } from "zod";

const formData = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Password must be at least 5 characters long" }).max(20, { message: "Password cannot exceed 20 characters" }),
});

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const prisma = new PrismaClient();

  try {
    formData.parse(body);
  } catch (error: any) {
    return Response.json({ message: error.issues[0].message, success: false });
  }

  try {
    const userVerify = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (userVerify) {
      return Response.json({
        message: `Welcome back ${userVerify.name} !`,
        success: true,
      });
    } else {
      return Response.json({ message: "Email || password is wrong !", success: false });
    }
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong !", success: false });
  }
};
