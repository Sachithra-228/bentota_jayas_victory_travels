import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { GalleryImage } from "@/models/GalleryImage";
import { galleryImageSchema } from "@/lib/adminSchemas";
import { serializeGalleryImage } from "@/lib/serialize";

export async function GET() {
  await connectToDatabase();
  const docs = await GalleryImage.find()
    .sort({ section: 1, order: 1, createdAt: 1 })
    .lean();
  return NextResponse.json({ images: docs.map(serializeGalleryImage) });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = galleryImageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  await connectToDatabase();

  // Append to the end of its section if no explicit order given.
  if (!parsed.data.order) {
    const count = await GalleryImage.countDocuments({
      section: parsed.data.section,
    });
    parsed.data.order = count;
  }

  const created = await GalleryImage.create(parsed.data);
  return NextResponse.json(
    { image: serializeGalleryImage(created) },
    { status: 201 }
  );
}
