import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { GalleryImage } from "@/models/GalleryImage";
import { galleryImageSchema } from "@/lib/adminSchemas";
import { serializeGalleryImage } from "@/lib/serialize";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json().catch(() => null);
  const parsed = galleryImageSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  await connectToDatabase();
  const updated = await GalleryImage.findByIdAndUpdate(params.id, parsed.data, {
    new: true,
    runValidators: true,
  });
  if (!updated) {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }
  return NextResponse.json({ image: serializeGalleryImage(updated) });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  const deleted = await GalleryImage.findByIdAndDelete(params.id);
  if (!deleted) {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
