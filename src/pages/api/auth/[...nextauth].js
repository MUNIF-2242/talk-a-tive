import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyUserService } from "../../../lib/services/user-service";
import {connectMongoDB} from "../../../config/DB";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        await connectMongoDB();
        const result = await verifyUserService({userName:credentials.name});
   
        if (!result) {
          throw new Error("No user Found");
        }

        if (result.name !== credentials.name) {
          throw new Error("Username doesn't match");
        }

        return result;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // const result = await verifyUserService({userName:credentials.name});
      // console.log(result);
      session.user.id = token.sub;
      return session;
    },
  },
};

export default NextAuth(authOptions);
