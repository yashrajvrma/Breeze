import { streamText, appendResponseMessages } from "ai";
import { openai } from "@ai-sdk/openai";
import prisma from "@/db";
import { docsSystemPrompt } from "@/lib/prompt";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { NextRequest } from "next/server";

// export const runtime = "edge";

// export async function POST(req: NextRequest) {
//   const { chatId, messages } = await req.json();

//   // console.log("messages is ", messages);
//   console.log("chat id is ", chatId);

//   const session = await getServerSession(authConfig);

//   if (!session) return new Response("Unauthorized", { status: 401 });

//   const userId = session.user.id!;

//   const userMessage = messages[messages.length - 1];
//   const dbMessages = await prisma.message.findMany({
//     where: { chatId },
//     orderBy: { orderIndex: "asc" },
//   });

//   if (
//     dbMessages[0] &&
//     dbMessages[0].sender === "user" &&
//     dbMessages[0].status === "PENDING"
//   ) {
//   }
//   console.log("user id is ", userId);

//   // Determine whether to store the user message
//   const shouldStoreUserMessage =
//     dbMessages.length > 1 || // there are other messages
//     dbMessages[0]?.sender !== "user" || // first message isn't user
//     dbMessages[0]?.status !== "PENDING" || // first message isn't pending
//     dbMessages[0]?.content.toLowerCase() !== userMessage.content.toLowerCase(); // content mismatch

//   console.log("store msg is ", shouldStoreUserMessage);

//   // Calculate current orderIndex (manually)
//   const lastOrderIndex = dbMessages.length
//     ? dbMessages[dbMessages.length - 1].orderIndex
//     : 1;

//   // Store user message only if it’s not already there
//   let userMessageId: string = "";

//   if (shouldStoreUserMessage) {
//     console.log("storing first meessages ");

//     const userMsg = await prisma.message.create({
//       data: {
//         chatId,
//         userId,
//         sender: "user",
//         content: userMessage.content,
//         status: "PENDING",
//         orderIndex: lastOrderIndex + 1,
//       },
//     });
//     userMessageId = userMsg.id;
//   } else {
//     userMessageId = dbMessages[0].id;
//   }

//   const result = streamText({
//     model: openai("gpt-3.5-turbo"),
//     system: docsSystemPrompt,
//     maxTokens: 2000,
//     messages: messages.map((m: any) => ({
//       role: m.role,
//       content: m.content,
//     })),

//     onFinish: async ({ response }) => {
//       console.log("hii");
//       const assistantMessages = appendResponseMessages({
//         messages,
//         responseMessages: response.messages,
//       });

//       const assistantResponse = assistantMessages.find(
//         (m) => m.role === "assistant"
//       );

//       const llmResponse = assistantMessages[assistantMessages.length - 1];

//       console.log("llm resp is", JSON.stringify(llmResponse));

//       console.log("assistant response ", JSON.stringify(assistantResponse));

//       if (llmResponse && llmResponse.role === "assistant") {
//         try {
//           await prisma.message.create({
//             data: {
//               chatId: chatId,
//               userId: userId,
//               sender: "assistant",
//               content: llmResponse.content,
//               status: "COMPLETED",
//               orderIndex: lastOrderIndex + (shouldStoreUserMessage ? 2 : 1),
//             },
//           });
//           console.log("message created in db");
//           await prisma.message.update({
//             where: {
//               id: userMessageId,
//             },
//             data: {
//               status: "COMPLETED",
//             },
//           });
//           console.log("message updated in db");
//         } catch (err) {
//           console.error("Failed to store assistant response:", err);
//         }
//       }
//     },
//   });

//   return result.toDataStreamResponse({});
// }
