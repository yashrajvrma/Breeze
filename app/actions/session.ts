"use server";

import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import prisma from "@/db";
import { redirect } from "next/navigation";
import { openai } from "@ai-sdk/openai";
import { titleSystemPrompt } from "@/lib/prompt";
import { generateText } from "ai";

export async function createChatSession(formData: FormData) {
  console.log("inside server components");

  const session = await getServerSession(authConfig);

  if (!session || !session.user) {
    redirect("/signin");
  }

  const userId = session.user.id!;
  const message = formData.get("message");

  let chat;

  try {
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      system: titleSystemPrompt,
      prompt: message as string,
    });

    chat = await prisma.chat.create({
      data: {
        userId: userId,
        title: text,
      },
    });

    await prisma.message.create({
      data: {
        chatId: chat.id,
        sender: "user",
        userId: userId,
        content: message as string,
        orderIndex: 1,
        status: "PENDING",
      },
    });
  } catch (error: any) {
    throw new Error(error.message || "Failed to create chat");
  }

  redirect(`/dummy/${chat.id}`);
}
