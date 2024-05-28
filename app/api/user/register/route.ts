import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
  const prisma = new PrismaClient();
  const body = await req.json();

  try {
    const OtpVerify = await prisma.user.findUnique({
      where: {
        email: body.email,
        otp: body.otp,
      },
    });

    if (OtpVerify) {
      await prisma.user.update({
        where: {
          email: body.email,
        },
        data: {
          verified: true,
          otp: "",
        },
      });
    
      return Response.json({
        message: "Otp verified successfully!",
        success: true,
      });
    } else {
      return Response.json({
        message: "Wrong otp entered !",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return Response.json({
      message: "Something went wrong!",
      success: false,
    });
  }
};
