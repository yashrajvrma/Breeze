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
          access_type: "offline",
        },
      },
      checks: ["pkce", "state"],
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async signIn({ account, profile }) {
      try {
        if (!account || !profile) {
          throw new Error("Invalid OAuth profile");
        }

        const googleProfile = profile as {
          email: string;
          name?: string;
          picture?: string;
          email_verified?: boolean;
        };

        // Validate email
        if (!googleProfile.email || googleProfile.email_verified === false) {
          throw new Error("Email is not verified");
        }

        await prisma.$transaction(async (tx) => {
          await tx.user.upsert({
            where: { email: googleProfile.email },
            create: {
              email: googleProfile.email,
              name: googleProfile.name,
              avatar: googleProfile.picture,
            },
            update: {
              name: googleProfile.name,
              avatar: googleProfile.picture,
              updatedAt: new Date(),
            },
          });
        });

        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },

    async session({ session, token }) {
      try {
        const customSession = session as CustomSession;

        if (token.sub) {
          customSession.user.id = token.sub;
        }

        if (session.user?.email) {
          const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
              id: true,
              name: true,
              avatar: true,
              email: true,
            },
          });

          if (user) {
            customSession.user.id = user.id;
            customSession.user.name = user.name || session.user.name;
            customSession.user.image = user.avatar || session.user.image;
            customSession.user.email = user.email;
          }
        }

        return customSession;
      } catch (error) {
        console.error("Session error:", error);
        throw new Error("Failed to create session");
      }
    },

    async jwt({ token, user, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }

      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { id: true },
        });

        if (dbUser) {
          token.sub = dbUser.id;
        }
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
    signOut: "/",
    error: "/error",
  },
  debug: process.env.NODE_ENV === "development",
  useSecureCookies: process.env.NODE_ENV === "production",
};
