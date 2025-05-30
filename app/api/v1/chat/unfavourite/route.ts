import prisma from "@/db";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(authConfig);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;

    console.log("user id is ", userId);

    const { chatId } = await req.json();

    console.log("chat id is", chatId);

    const isChatIdValid = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
    });

    if (!isChatIdValid) {
      return new Response("Invalid chat id", { status: 400 });
    }

    const addToUnFavourite = await prisma.chat.update({
      where: {
        userId: userId as string,
        id: chatId,
      },
      data: {
        favourite: false,
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
    console.error("Failed to add to unfavourite", error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}
