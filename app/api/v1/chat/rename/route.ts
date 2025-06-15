import prisma from "@/db";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, title } = await req.json();

  try {
    const session = await getServerSession(authConfig);

    if (!session) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const isChatIdValid = await prisma.chat.findUnique({
      where: {
        id: id,
      },
    });

    if (!isChatIdValid) {
      return new Response("Invalid chat id", { status: 400 });
    }

    const renameChat = await prisma.chat.update({
      where: {
        id: id,
      },
      data: {
        title: title,
      },
    });

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Failed to rename chat", error);
    return new Response("Sorry something went wrong", {
      status: 500,
    });
  }
}
