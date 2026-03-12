import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const filePath = path.join(process.cwd(), "data/bank.json");

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({});
  }

  const data = fs.readFileSync(filePath, "utf8");

  return NextResponse.json(JSON.parse(data));
}
