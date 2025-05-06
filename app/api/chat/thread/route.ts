import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const chatId = req?.nextUrl?.searchParams.get("chatId");

    if (!chatId) {
      return NextResponse.json(
        {
          success: false,
          message: "Chat Id is required",
        },
        {
          status: 400,
        }
      );
    }
    const isChatIdValid = await prisma.chat.findUnique({
      where: {
        id: chatId,
        isActive: true,
      },
    });

    console.log("chat id is sjssj", isChatIdValid);

    if (!isChatIdValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid chat Id",
        },
        {
          status: 400,
        }
      );
    }

    const threadMessage = await prisma.message.findMany({
      where: {
        chatId: chatId,
        isActive: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        sender: true,
        content: true,
        status: true,
        orderIndex: true,
      },
    });

    if (threadMessage && threadMessage.length === 0) {
      return NextResponse.json(
        {
          sucess: true,
          message: "No messages found",
          thread: threadMessage,
        },
        {
          status: 200,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thread retrieved successfully",
        thread: {
          chatId: chatId,
          messages: threadMessage,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Sorry something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
