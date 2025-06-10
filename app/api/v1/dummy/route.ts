import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  return NextResponse.json({
    message: "Hello",
  });
}
