import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();

  const filePath = path.join(process.cwd(), "data/bank.json");

  fs.writeFileSync(filePath, JSON.stringify(body, null, 2));

  return NextResponse.json({ success: true });
}
