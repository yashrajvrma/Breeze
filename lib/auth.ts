import { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/db";

export interface CustomSession extends Session {
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
          scope: "openid email profile",
          prompt: "consent",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ profile }) {
      try {
        const googleProfile = profile as {
          email?: string;
          name?: string;
          picture?: string;
        };

        if (!googleProfile?.email) {
          console.error("Email is required");
          return false;
        }
        await prisma.user.upsert({
          where: {
            email: googleProfile.email,
          },
          create: {
            email: googleProfile.email,
            name: googleProfile.name || null,
            avatar: googleProfile.picture || null,
          },
          update: {
            name: googleProfile.name || null,
            avatar: googleProfile.picture || null,
          },
        });

        return true;
      } catch (error) {
        console.error("Error during sign in:", error);
        return false;
      }
    },

    async session({ session }) {
      try {
        const customSession = session as CustomSession;

        if (customSession?.user?.email) {
          const user = await prisma.user.findUnique({
            where: { email: customSession.user.email },
          });

          if (user) {
            customSession.user.id = user.id;
            customSession.user.name = user.name;
            customSession.user.image = user.avatar;
          }
        }

        return customSession;
      } catch (error) {
        console.error("Error fetching session data:", error);
        return session;
      }
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email as string },
        });

        if (dbUser) {
          token.userId = dbUser.id;
        }
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
    error: "/error",
  },
  debug: process.env.NODE_ENV === "development",
};
