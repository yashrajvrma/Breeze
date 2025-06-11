import prisma from "@/db";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    await prisma.user.updateMany({
      data: {
        noOfRequest: 0,
      },
    });

    return Response.json(
      { success: true },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response("Internal server error", {
      status: 500,
    });
  }
}
