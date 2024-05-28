import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const AuthInfo = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email) return null;

        try {
          const prisma = new PrismaClient();

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
          return user;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.uid = user.id;
        token.username = user.username;
      }

      return token;
    },
    session: ({ session, token }: any) => {
      if (session.user) {
        session.user.id = token.uid;
        session.user.username = token.username;
      }
      return session;
    },
  },

  pages: {
    signIn: "/register",
  },
};
