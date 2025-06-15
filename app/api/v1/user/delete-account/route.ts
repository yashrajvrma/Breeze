import prisma from "@/db";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  try {
    const session = await getServerSession(authConfig);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        isActive: true,
      },
    });

    if (!user) {
      return new Response("Invalid user id", { status: 400 });
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Account deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Failed to delete account", error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}
