import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Package } from "@/models/Package";
import { packageSchema } from "@/lib/adminSchemas";
import { serializePackage } from "@/lib/serialize";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json().catch(() => null);
  const parsed = packageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  await connectToDatabase();

  // Guard against another package taking this slug.
  const clash = await Package.findOne({
    slug: parsed.data.slug,
    _id: { $ne: params.id },
  });
  if (clash) {
    return NextResponse.json(
      { error: "Another package already uses this slug." },
      { status: 409 }
    );
  }

  const updated = await Package.findByIdAndUpdate(params.id, parsed.data, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    return NextResponse.json({ error: "Package not found." }, { status: 404 });
  }

  return NextResponse.json({ package: serializePackage(updated) });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  const deleted = await Package.findByIdAndDelete(params.id);
  if (!deleted) {
    return NextResponse.json({ error: "Package not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
