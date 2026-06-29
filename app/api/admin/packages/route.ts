import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Package } from "@/models/Package";
import { packageSchema } from "@/lib/adminSchemas";
import { serializePackage } from "@/lib/serialize";

export async function GET() {
  await connectToDatabase();
  const docs = await Package.find().sort({ order: 1, createdAt: 1 }).lean();
  return NextResponse.json({ packages: docs.map(serializePackage) });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = packageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  await connectToDatabase();

  const exists = await Package.findOne({ slug: parsed.data.slug });
  if (exists) {
    return NextResponse.json(
      { error: "A package with this slug already exists." },
      { status: 409 }
    );
  }

  const created = await Package.create(parsed.data);
  return NextResponse.json({ package: serializePackage(created) }, { status: 201 });
}
