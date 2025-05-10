import prisma from "@/db";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;
    console.log("id is", id);

    const session = await getServerSession(authConfig);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const chatTitle = await prisma.chat.findUnique({
      where: {
        id: id,
      },
      select: {
        title: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        title: chatTitle?.title,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Failed to fetch chat");
  }
}
