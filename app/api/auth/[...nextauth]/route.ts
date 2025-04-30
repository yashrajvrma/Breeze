import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = {
    id: 1,
    name: "hitler",
    email: "hitler@gmail.com",
  };

  return NextResponse.json({
    message: "succcess",
    data: data,
  });
}
