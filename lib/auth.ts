import { NextAuthOptions, SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/db";
import { Session } from "next-auth";

export interface session extends Session {
  user: {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
  };
}

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/userinfo.profile",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const googleProfile = profile as {
        email?: string;
        name?: string;
        picture?: string;
      };

      if (!googleProfile?.email) {
        throw new Error("Sorry something went wrong");
      }

      const user = await prisma.user.upsert({
        where: {
          email: googleProfile.email,
        },
        create: {
          email: googleProfile.email,
          name: googleProfile.name,
          avatar: googleProfile.picture,
        },
        update: {
          name: googleProfile.name,
          avatar: googleProfile.picture,
        },
      });

      return true;
    },

    async session({ session }) {
      const newSession: session = session as session;

      if (newSession?.user?.email) {
        const user = await prisma.user.findUnique({
          where: { email: newSession.user.email },
        });

        if (user) {
          (newSession.user.id = user.id),
            (newSession.user.email = user.email),
            (newSession.user.name = user?.name),
            (newSession.user.image = user.avatar);
        }
      }

      return newSession;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
};
