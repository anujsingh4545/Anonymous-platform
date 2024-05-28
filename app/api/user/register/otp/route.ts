import { NextRequest } from "next/server";
import { z } from "zod";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const formData = z.object({
  name: z.string().min(5, { message: "Name must be at least 5 characters long" }).max(20, { message: "Name cannot exceed 20 characters" }),
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
    const checkMail = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (checkMail?.verified == true) {
      return Response.json({ message: "Email Already registered, please log in !", success: false });
    }

    // otp generator code
    const otp = otpGenerator.generate(6, {
      digits: true,
      specialChars: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAILNAME,
        pass: process.env.MAILPASS,
      },
    });

    const mailOptions = {
      from: "Anonymous Web Tech",
      to: body.email,
      subject: "Otp for email verification.",
      text: `Your OTP for Email verification is ${otp}`,
    };

    // when otp gets regenerated but user is already there

    if (checkMail?.verified == false) {
      await prisma.user.update({
        where: {
          email: body.email,
        },
        data: {
          otp: otp,
        },
      });
    }

    //   If user is registering for first time
    if (!checkMail) {
      await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
          otp: otp,
          username: body.email.split("@")[0],
        },
      });
    }

    await transporter.sendMail(mailOptions);
    return Response.json({ message: "Otp sent successfully !", success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Error sending mail or generating OTP!", success: false });
  }
};
