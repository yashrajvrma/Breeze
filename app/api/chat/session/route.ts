import prisma from "@/db";
import { titleSystemPrompt } from "@/lib/prompt";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, message } = await req.json();
  console.log("msg", message);
  console.log("user id", userId);

  try {
    const { text } = await generateText({
      model: google("gemini-1.5-pro"),
      system: titleSystemPrompt,
      prompt: message,
    });

    if (text) {
      const createChat = await prisma.chat.create({
        data: {
          userId: userId,
          title: text,
        },
      });

      const chatId = createChat.id;

      // fetch all msg to get OrderIndex
      const fetchMessages = await prisma.message.findMany({
        where: {
          chatId: chatId,
        },
      });
      const getOrderIndex = fetchMessages[fetchMessages.length - 1]?.orderIndex;

      const orderIndex = getOrderIndex ? getOrderIndex : 1;
      console.log("index", orderIndex);

      // add the user message
      const addUserMessage = await prisma.message.create({
        data: {
          chatId: chatId,
          sender: "user",
          userId: userId,
          content: message,
          orderIndex: orderIndex,
        },
      });

      return NextResponse.json(
        {
          message: "success",
          chatId: chatId,
          title: text,
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
}
