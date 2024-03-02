import { NextRequest } from "next/server";

// Services
import { listInvoices } from "@/lib/store";

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username");
  if (!username) {
    return new Response("username is required", { status: 400 });
  }
  const result = await listInvoices(username);
  return new Response(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
