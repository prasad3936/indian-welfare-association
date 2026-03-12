import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();

  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const venue = formData.get("venue") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;

  const file = formData.get("image") as File;

  let imagePath = "";

  if (file) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name}`;

    const uploadDir = path.join(process.cwd(), "public/events");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    imagePath = `/events/${fileName}`;
  }

  const slug = title.toLowerCase().replace(/\s+/g, "-");

  const eventsFile = path.join(process.cwd(), "data/events.json");

  let events = [];

  if (fs.existsSync(eventsFile)) {
    const fileData = fs.readFileSync(eventsFile, "utf8");
    events = JSON.parse(fileData);
  }

  const newEvent = {
    title,
    date,
    venue,
    description,
    type,
    image: imagePath,
    slug,
  };

  events.unshift(newEvent);

  fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));

  return NextResponse.json({ success: true, events });
}
