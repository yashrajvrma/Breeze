import { streamText, appendResponseMessages } from "ai";
import { openai } from "@ai-sdk/openai";
import prisma from "@/db";
import { docsSystemPrompt } from "@/lib/prompt";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { chatId, userId, messages } = await req.json();

  const session = await getServerSession(authConfig);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userMessage = messages[messages.length - 1];

  // Find last order index for message ordering
  const dbMessages = await prisma.message.findMany({
    where: { chatId },
    orderBy: { orderIndex: "asc" },
  });

  const lastOrderIndex = dbMessages.length
    ? dbMessages[dbMessages.length - 1].orderIndex
    : 0;

  // Save user message if it’s not a duplicate of the first message
  try {
    if (
      dbMessages.length === 0 ||
      userMessage.content.toLowerCase() !== dbMessages[0].content.toLowerCase()
    ) {
      await prisma.message.create({
        data: {
          chatId,
          userId,
          sender: "user",
          content: userMessage.content,
          status: "PENDING",
          orderIndex: lastOrderIndex + 1,
        },
      });
    }
  } catch (error) {
    console.error("Failed to save user message:", error);
  }

  // Stream assistant response from OpenAI and persist onFinish
  const result = await streamText({
    model: openai("gpt-4o"),
    system: docsSystemPrompt,
    messages: messages.map((m: any) => ({
      role: m.role,
      content: m.content,
    })),
    async onFinish({ response }) {
      const fullMessages = appendResponseMessages({
        messages,
        responseMessages: response.messages,
      });

      const assistantMessage = fullMessages.find((m) => m.role === "assistant");

      if (assistantMessage?.content) {
        try {
          await prisma.message.create({
            data: {
              chatId,
              userId,
              sender: "assistant",
              content: assistantMessage.content,
              status: "COMPLETED",
              orderIndex: lastOrderIndex + 2,
            },
          });
        } catch (error) {
          console.error("Failed to save assistant message:", error);
        }
      }
    },
  });

  return result.toDataStreamResponse();
}
