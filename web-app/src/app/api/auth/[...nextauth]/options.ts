import type { DefaultSession, NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongoclient";

export const options: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      profile(profile: GoogleProfile) {
        return {
          ...profile,
          role: profile.role ?? "user",
          id: profile.sub,
          image: profile.picture,
          type: profile.type ?? "oauth",
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const res = await fetch("http:127.0.0.1:8000/api/accounts/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        if (res.status == 200) {
          const data = await res.json();
          const selectedValues = Object.values(data);
          const user = {
            name: selectedValues[0],
            email: credentials?.email,
            type: selectedValues[1],
            image: selectedValues[2],
            role: selectedValues[3],
            id: selectedValues[4],
          };
          return user as any;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/portal",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.type = user.type;
      }

      if (trigger === "update" && session?.name) {
        token.name = session?.name;
      } else if (trigger === "update" && session?.email) {
        token.email = session?.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.type = token.type;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(options);
