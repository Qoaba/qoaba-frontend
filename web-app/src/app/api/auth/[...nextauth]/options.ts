import { IUser } from "@/app/types";
import { connectToMongoDB } from "@/lib/mongoclient";
import User from "@/models/user";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
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
        await connectToMongoDB().catch((err) => {
          throw new Error(err);
        });

        const user = await User.findOne({
          username: credentials?.username,
        }).select("+password");

        if (!user) {
          return null;
        }

        const isPasswordCorrect = credentials!.password === user.password;

        if (!isPasswordCorrect) {
          return null;
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      const user = token.user as IUser;
      session.user = user;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(options);
