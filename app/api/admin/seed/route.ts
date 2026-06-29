import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Package } from "@/models/Package";
import { GalleryImage } from "@/models/GalleryImage";
import { DEFAULT_GALLERY, DEFAULT_PACKAGES } from "@/lib/defaultContent";

/**
 * Imports the bundled default content into the database.
 * Idempotent: only seeds a collection when it is currently empty.
 * Protected by middleware (requires an admin session).
 */
export async function POST() {
  try {
    await connectToDatabase();
  } catch {
    return NextResponse.json(
      { error: "Database is not configured." },
      { status: 500 }
    );
  }

  let seededPackages = 0;
  let seededGallery = 0;

  if ((await Package.countDocuments()) === 0) {
    const docs = DEFAULT_PACKAGES.map((pkg, index) => ({
      slug: pkg.slug,
      label: pkg.label,
      title: pkg.title,
      images: pkg.images ?? [],
      pickupAreas: pkg.pickupAreas,
      includesLabel: pkg.includesLabel,
      includesText: pkg.includesText,
      rows: pkg.rows ?? [],
      transferSections: pkg.transferSections ?? [],
      note: pkg.note,
      warning: pkg.warning,
      order: index,
    }));
    const inserted = await Package.insertMany(docs);
    seededPackages = inserted.length;
  }

  if ((await GalleryImage.countDocuments()) === 0) {
    // Preserve per-section ordering from the defaults list.
    const counters: Record<string, number> = {};
    const docs = DEFAULT_GALLERY.map((item) => {
      const order = counters[item.section] ?? 0;
      counters[item.section] = order + 1;
      return {
        section: item.section,
        src: item.src,
        alt: item.alt,
        order,
      };
    });
    const inserted = await GalleryImage.insertMany(docs);
    seededGallery = inserted.length;
  }

  return NextResponse.json({
    ok: true,
    seededPackages,
    seededGallery,
    message:
      seededPackages || seededGallery
        ? "Content imported."
        : "Content already exists — nothing to import.",
  });
}
