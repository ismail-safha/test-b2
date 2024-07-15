import NextAuth from "next-auth";

type UserId = string;

declare module "next-auth" {
  interface JWT {
    id: UserId;
    role: UserId;
  }
  interface Session {
    user: User & {
      id: UserId;
      role: string;
    };
    token: {
      role: string;
    };
  }
}
