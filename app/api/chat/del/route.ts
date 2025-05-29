import prisma from "@/db";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const chatId = await req.json();

  try {
    const session = await getServerSession(authConfig);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const isChatIdValid = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
    });

    if (!isChatIdValid) {
      return new Response("Invalid chat id", { status: 400 });
    }

    const delChatId = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        isActive: false,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Chat deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Failed to delete chat", error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}
