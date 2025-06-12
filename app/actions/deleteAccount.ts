"use server";

import prisma from "@/db";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function createChatSession(userId: string) {
  const session = await getServerSession(authConfig);

  if (!session || !session.user) {
    redirect("/signin");
  }

  try {
    const deleteUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: false,
      },
    });
  } catch (error: any) {
    throw new Error("Something went wrong");
  }
}
