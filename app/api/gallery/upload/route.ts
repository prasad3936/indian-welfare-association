import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const galleryDir = path.join(process.cwd(), "public/gallery");
  const jsonPath = path.join(process.cwd(), "public/gallery.json");

  const filePath = path.join(galleryDir, file.name);

  fs.writeFileSync(filePath, buffer);

  let images: string[] = [];

  if (fs.existsSync(jsonPath)) {
    images = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  }

  images.push(file.name);

  fs.writeFileSync(jsonPath, JSON.stringify(images, null, 2));

  return Response.json({ success: true });
}
