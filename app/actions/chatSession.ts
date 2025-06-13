"use server";

import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import prisma from "@/db";
import { redirect } from "next/navigation";
import { openai } from "@ai-sdk/openai";
import { TITLE_SYSTEM_PROMPT } from "@/lib/prompt";
import { generateText } from "ai";
import { checkNoOfRequest } from "@/utils/no-of-request";

export async function createChatSession(formData: FormData) {
  console.log("inside server components");

  const session = await getServerSession(authConfig);

  if (!session || !session?.user) {
    redirect("/signin");
  }

  const userId = session.user.id!;

  // check no of request
  const request = await checkNoOfRequest({ userId });
  console.log("request got is", request);

  if (!request?.allowed) {
    console.log("Free credit expired");

    return {
      success: false,
      error: "Free limit reached. Try again later",
    };
  }

  const message = formData.get("message");

  let chat;

  try {
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      system: TITLE_SYSTEM_PROMPT,
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
    return {
      success: true,
      data: {
        chatId: chat.id,
      },
    };
  } catch (error: any) {
    throw new Error("Something went wrong");
  }
}
