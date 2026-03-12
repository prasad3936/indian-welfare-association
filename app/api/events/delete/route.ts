import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { slug } = await req.json();

  const filePath = path.join(process.cwd(), "data/events.json");

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ success: false });
  }

  let events = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const event = events.find((e: any) => e.slug === slug);

  if (event?.image) {
    const imagePath = path.join(process.cwd(), "public", event.image);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  events = events.filter((e: any) => e.slug !== slug);

  fs.writeFileSync(filePath, JSON.stringify(events, null, 2));

  return NextResponse.json({ success: true, events });
}
