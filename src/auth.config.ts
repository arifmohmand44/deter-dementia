// src/auth.config.ts
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";

declare module "next-auth" {
  interface User {
    id: string;
    firstLogin: boolean | null;
  }
  interface Session {
    user: User & {
      id: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const existingUser = await prisma.users.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (!existingUser?.password) return null;
        const passwordsMatch = await compare(password, existingUser.password);
        return passwordsMatch ? existingUser : null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.firstLogin = user.firstLogin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.firstLogin = token.firstLogin as boolean | null;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
};