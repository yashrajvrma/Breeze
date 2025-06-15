import prisma from "@/db";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req?.nextUrl?.searchParams.get("userId");
  const maxRequest = process.env.MAX_REQUEST!;

  const session = getServerSession(authConfig);

  if (!session) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  if (!userId) {
    return new Response("User id is required");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        isActive: true,
      },
    });

    if (!user) {
      return new Response(`No user exists with userId:  ${userId}`);
    }

    const requestCount = user.noOfRequest;

    if (requestCount > Number(maxRequest)) {
      return NextResponse.json({
        success: false,
        requestCount,
        maxRequest,
      });
    }

    return Response.json({
      success: true,
      requestCount,
      maxRequest,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
