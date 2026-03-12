import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const galleryPath = path.join(process.cwd(), "public/gallery");

    const files = fs.readdirSync(galleryPath);

    return Response.json(files);
  } catch (error) {
    console.error("Gallery list error:", error);

    return Response.json({ error: "Failed to load gallery" }, { status: 500 });
  }
}
