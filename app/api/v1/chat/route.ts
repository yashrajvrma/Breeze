import prisma from "@/db";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const pageParam = req.nextUrl.searchParams.get("page") || "1";
    const sizeParam = req.nextUrl.searchParams.get("size") || "10";

    const userId = session.user.id;

    const page = parseInt(pageParam, 10);
    const size = parseInt(sizeParam, 10);

    const skip = (page - 1) * size;

    const chats = await prisma.chat.findMany({
      where: {
        userId: userId!,
        isActive: true,
        favourite: false,
      },
      orderBy: {
        updatedAt: "asc",
      },
      select: {
        id: true,
        title: true,
        updatedAt: true,
      },
      take: size,
      skip: skip,
    });

    const totalChats = await prisma.chat.count({
      where: {
        userId: userId!,
        isActive: true,
        favourite: false,
      },
    });

    return NextResponse.json(
      {
        success: true,
        page,
        size,
        totalChats,
        chats,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch chats:", error);
    return new Response("Sorry something went wrong", { status: 500 });
  }
}
