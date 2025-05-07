import { streamText, appendResponseMessages } from "ai";
import { openai } from "@ai-sdk/openai";
import prisma from "@/db";
import { docsSystemPrompt } from "@/lib/prompt";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { NextRequest } from "next/server";

// export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { chatId, messages } = await req.json();

  console.log("messages is ", messages);
  console.log("chat id is ", chatId);

  const session = await getServerSession(authConfig);

  if (!session) return new Response("Unauthorized", { status: 401 });

  const userId = session.user.id!;

  const userMessage = messages[messages.length - 1];
  const dbMessages = await prisma.message.findMany({
    where: { chatId },
    orderBy: { orderIndex: "asc" },
  });

  console.log("user id is ", userId);

  // Determine whether to store the user message
  const shouldStoreUserMessage =
    dbMessages.length > 1 || // there are other messages
    dbMessages[0]?.sender !== "user" || // first message isn't user
    dbMessages[0]?.status !== "PENDING" || // first message isn't pending
    dbMessages[0]?.content.toLowerCase() !== userMessage.content.toLowerCase(); // content mismatch

  console.log("store msg is ", shouldStoreUserMessage);

  // Calculate current orderIndex (manually)
  const lastOrderIndex = dbMessages.length
    ? dbMessages[dbMessages.length - 1].orderIndex
    : 1;

  // Store user message only if it’s not already there
  if (shouldStoreUserMessage) {
    console.log("storing first meessages ");

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

  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    system: docsSystemPrompt,
    messages: messages.map((m: any) => ({
      role: m.role,
      content: m.content,
    })),
    async onFinish({ response }) {
      const assistantMessages = appendResponseMessages({
        messages,
        responseMessages: response.messages,
      });

      console.log("assistant msg is ", assistantMessages);

      const assistantResponse = assistantMessages.find(
        (m) => m.role === "assistant"
      );

      console.log("assistant response ", JSON.stringify(assistantResponse));

      if (assistantResponse?.content) {
        try {
          await prisma.message.create({
            data: {
              chatId: chatId,
              userId: userId,
              sender: "assistant",
              content: assistantResponse.content,
              status: "COMPLETED",
              orderIndex: lastOrderIndex + (shouldStoreUserMessage ? 2 : 1),
            },
          });
        } catch (err) {
          console.error("Failed to store assistant response:", err);
        }
      }
    },
  });

  return result.toDataStreamResponse();
}
