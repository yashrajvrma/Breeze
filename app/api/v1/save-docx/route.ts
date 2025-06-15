import prisma from "@/db";
import { authConfig } from "@/lib/auth";
import { updateMessageResponse } from "@/lib/utils/save-docx";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { id, updatedDocHtml } = await req.json();

  try {
    const session = await getServerSession(authConfig);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const message = await prisma.message.findUnique({
      where: {
        id: id,
      },
    });

    if (!message) {
      return new Response("Invalid message id", { status: 400 });
    }

    const chatId = message.chatId;
    const originalContent = message.content;

    const updatedContent = updateMessageResponse({
      originalContent,
      updatedDocHtml,
    });

    await prisma.message.update({
      where: {
        id: id,
      },
      data: {
        content: updatedContent,
      },
    });

    await prisma.chat.update({
      where: { id: chatId },
      data: { updatedAt: new Date() },
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
    console.error("Failed to save docs", error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}
