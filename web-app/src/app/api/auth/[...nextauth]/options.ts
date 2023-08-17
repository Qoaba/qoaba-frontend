import { connectToMongoDB } from "@/lib/mongoclient";
import User from "@/models/user";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        await connectToMongoDB().catch(err => { throw new Error(err) })

        const user = await User.findOne({
          username: credentials?.username
        }).select("+password")

        if (!user) {
          throw new Error("Invalid credentials")
        }

        const isPasswordCorrect = credentials!.password === user.password

        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials")
        }

        return user
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
