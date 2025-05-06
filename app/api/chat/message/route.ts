import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import prisma from "@/db";
import { docsSystemPrompt } from "@/lib/prompt";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { messages, chatId, userId } = await req.json();

    const lastMessage = messages[messages.length - 1];

    // Get the last orderIndex from DB
    const latest = await prisma.message.findFirst({
      where: { chatId },
      orderBy: { orderIndex: "desc" },
    });

    let orderIndex = latest ? latest.orderIndex + 1 : 1;

    const result = await streamText({
      model: openai("gpt-4"),
      system: docsSystemPrompt,
      messages,
      stream: true,
      onStart: async () => {
        // Save user message
        await prisma.message.create({
          data: {
            chatId,
            userId,
            content: lastMessage.content,
            sender: "user",
            status: "COMPLETED", // or "PENDING" if you want to mark it before completion
            orderIndex: orderIndex,
          },
        });
      },
      onCompletion: async (completion) => {
        // Save assistant response
        await prisma.message.create({
          data: {
            chatId,
            userId,
            content: completion,
            sender: "assistant",
            status: "COMPLETED",
            orderIndex: orderIndex + 1,
          },
        });
      },
    });

    // ✅ Compatible with AI SDK 4.0+
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
