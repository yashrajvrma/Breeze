import { streamText, appendResponseMessages } from "ai";
import { openai } from "@ai-sdk/openai";
import prisma from "@/db";
import { DOC_SYSTEM_PROMPT } from "@/lib/prompt";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { checkNoOfRequest } from "@/utils/no-of-request";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const { chatId, messages } = await req.json();

  const session = await getServerSession(authConfig);

  // get last message
  let msgArray = [];
  const lastMsg = messages[messages.length - 1];
  msgArray.push(lastMsg);
  console.log("chat id is ", chatId);

  if (!session) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const userId = session.user.id!;

  // check no of request
  const request = await checkNoOfRequest({ userId });

  console.log("request got is", request);

  if (!request?.allowed) {
    console.log("free credit expired");
    return new Response(`Free limit reached. Try again later`, {
      status: 429,
    });
  }

  // check if its a first message
  const userMessage = messages[messages.length - 1];

  const dbMessages = await prisma.message.findMany({
    where: { chatId, isActive: true },
    orderBy: { orderIndex: "asc" },
  });

  const lastOrderIndex = dbMessages.length
    ? dbMessages[dbMessages.length - 1].orderIndex
    : 1;

  let userMessageId: string = "";

  const isFirstMessage =
    dbMessages.length > 1 ||
    dbMessages[0].sender !== "user" ||
    dbMessages[0].status !== "PENDING" ||
    dbMessages[0]?.content.toLowerCase() !== userMessage.content.toLowerCase();

  if (isFirstMessage) {
    const saveUserMsg = await prisma.message.create({
      data: {
        chatId,
        userId,
        sender: "user",
        content: userMessage.content,
        status: "PENDING",
        orderIndex: lastOrderIndex + 1,
      },
    });
    userMessageId = saveUserMsg.id;
  } else {
    userMessageId = dbMessages[0].id;
  }

  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    system: DOC_SYSTEM_PROMPT,
    maxTokens: 1000,
    messages: messages.map((m: any) => ({
      role: m.role,
      content: m.content,
    })),
    async onFinish({ response }) {
      console.log("calling onFinish");
      const assistantMessages = appendResponseMessages({
        messages,
        responseMessages: response.messages,
      });

      console.log("last a msg is", response.messages);
      console.log("res is", assistantMessages[assistantMessages.length - 1]);

      // save the response msg in db

      const llmResponse = assistantMessages[assistantMessages.length - 1];

      if (llmResponse && llmResponse.role === "assistant") {
        try {
          await prisma.$transaction(async (tx) => {
            // Create assistant message
            const assistantMessage = await tx.message.create({
              data: {
                chatId: chatId,
                userId: userId,
                sender: "assistant",
                content: llmResponse.content,
                status: "COMPLETED",
                orderIndex: lastOrderIndex + (isFirstMessage ? 2 : 1),
              },
            });
            console.log("message created in db");

            // Update user message status
            await tx.message.update({
              where: { id: userMessageId },
              data: { status: "COMPLETED" },
            });

            // Update user credit
            const credit = await tx.user.update({
              where: { id: userId, isActive: true },
              data: {
                noOfRequest: request.requestCount + 1,
              },
            });
            console.log("credits is", credit.noOfRequest);

            // Update chat timestamp
            await tx.chat.update({
              where: { id: chatId },
              data: { updatedAt: new Date() },
            });
          });

          console.log("message updated in db");
        } catch (error) {
          console.error("Failed to store assistant response");
        }
      }
    },
  });

  result.consumeStream();

  return result.toDataStreamResponse();
}
