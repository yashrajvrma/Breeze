import prisma from "@/db";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

    const favourite = await prisma.favourite.create({
      data: {
        chatId: chatId,
        userId: userId as string,
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
    console.error("Failed to add to favourite", error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const userId = session.user.id;

    const favChats = await prisma.favourite.findMany({
      where: {
        userId: userId as string,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: favChats,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Failed to fetch favoruite chats", error);
    return new Response("Sorry something went wrong", {
      status: 500,
    });
  }
}
