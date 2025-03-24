import NextAuth from "next-auth";
import { authOptions } from "./options";

const handler = NextAuth(authOptions)


//Ye files inn verbs se chalti hai directly named ya default export nahi hoti..
export { handler as GET, handler as POST }