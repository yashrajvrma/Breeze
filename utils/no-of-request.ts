"use server";

import prisma from "@/db";

type RequestProps = {
  userId: string;
};

export async function checkNoOfRequest({ userId }: RequestProps) {
  try {
    const request = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        noOfRequest: true,
      },
    });

    console.log("request count is", request?.noOfRequest);

    const requestCount = request?.noOfRequest;

    if (!requestCount) {
      return 0;
    }

    return requestCount;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
