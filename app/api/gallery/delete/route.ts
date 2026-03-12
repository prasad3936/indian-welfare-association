import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const { name } = await req.json();

  const galleryDir = path.join(process.cwd(), "public/gallery");
  const jsonPath = path.join(process.cwd(), "public/gallery.json");

  const filePath = path.join(galleryDir, name);

  /* delete image */

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  /* update json */

  if (fs.existsSync(jsonPath)) {
    const images = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    const updated = images.filter((img: string) => img !== name);

    fs.writeFileSync(jsonPath, JSON.stringify(updated, null, 2));
  }

  return Response.json({ success: true });
}
