import prisma from "@/db";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authConfig);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = session.user.id!;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userId: userId,
        isActive: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        chats: chats,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Failed to store assistant response:", error);
  }
}
