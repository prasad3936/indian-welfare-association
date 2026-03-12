import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const filePath = path.join(process.cwd(), "data/events.json");

  if (!fs.existsSync(filePath)) {
    return NextResponse.json([]);
  }

  const data = fs.readFileSync(filePath, "utf8");
  const events = JSON.parse(data);

  return NextResponse.json(events);
}
