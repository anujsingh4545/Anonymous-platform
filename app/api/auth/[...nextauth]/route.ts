import NextAuth from "next-auth";
import { AuthInfo } from "../AuthInfo";

const handler = NextAuth(AuthInfo);

export { handler as GET, handler as POST };
