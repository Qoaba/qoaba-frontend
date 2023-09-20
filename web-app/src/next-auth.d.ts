import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      image: string;
      name: string;
      email: string;
      type: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    role: string;
    id: string;
    type: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
    id: string;
    type: string;
  }
}
