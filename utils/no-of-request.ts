"use server";

import prisma from "@/db";

type RequestProps = {
  userId: string;
};

export async function checkNoOfRequest({ userId }: RequestProps) {
  const maxRequest = process.env.MAX_REQUEST!;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        noOfRequest: true,
      },
    });

    const requestCount = user?.noOfRequest ?? 0;

    if (requestCount >= Number(maxRequest)) {
      return {
        allowed: false,
        requestCount,
      };
    }

    return {
      allowed: true,
      requestCount,
    };
  } catch (error) {
    console.error("checkNoOfRequest error:", error);
    throw new Error("Something went wrong");
  }
}
