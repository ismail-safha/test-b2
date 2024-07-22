import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt, { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        // check to see if email and password is valid
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid email or password");
        }
        // check to see if user exists
        const existingUser = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!existingUser) {
          return null;
        }
        // check to see if passwords match
        const isCorrectPassword = await compare(
          credentials.password,
          existingUser.password
        );
        if (!isCorrectPassword) {
          return null;
        }
        // return user object if everything is valid
        return {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
          clickCount: existingUser.clickCount,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.clickCount = token.clickCount;
        session.user.role = token.role;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });
      if (!dbUser) {
        token.id = user!.id;
        return token;
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        clickCount: dbUser.clickCount,
        role: dbUser.role,
      };
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
