import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { docsSystemPrompt } from "@/lib/prompt";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import prisma from "@/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const { message } = await req.json();

  const { textStream } = streamText({
    model: google("gemini-1.5-pro-latest"),
    system: docsSystemPrompt,
    prompt: message,
  });

  for await (const textPart of textStream) {
    console.log(textPart);
  }

  //   return result.toDataStreamResponse();

  //   return NextResponse.json(
  //     {
  //       success: true,
  //       message: "",
  //     },
  //     {
  //       status: 200,
  //     }
  //   );
}
