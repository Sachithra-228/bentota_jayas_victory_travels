import { connectToDatabase, hasDatabaseConfig } from "@/lib/db";
import { Package } from "@/models/Package";
import { GalleryImage, type GallerySection } from "@/models/GalleryImage";
import {
  DEFAULT_GALLERY,
  DEFAULT_PACKAGES,
  type GalleryItem,
  type PackageTab,
} from "@/lib/defaultContent";

/**
 * Returns the packages that drive the public packages page.
 * Falls back to the bundled defaults when the database is unconfigured,
 * unreachable, or empty — so the public site never breaks.
 */
export async function getPackages(): Promise<PackageTab[]> {
  if (!hasDatabaseConfig()) {
    return DEFAULT_PACKAGES;
  }

  try {
    await connectToDatabase();
    const docs = await Package.find().sort({ order: 1, createdAt: 1 }).lean();
    if (!docs.length) {
      return DEFAULT_PACKAGES;
    }
    return docs.map((doc) => {
      const fallback = DEFAULT_PACKAGES.find((pkg) => pkg.slug === doc.slug);

      return {
        slug: doc.slug,
        label: doc.label,
        title: doc.title,
        images: doc.images?.length ? doc.images : fallback?.images ?? [],
        pickupAreas: doc.pickupAreas || fallback?.pickupAreas,
        includesLabel: doc.includesLabel || fallback?.includesLabel,
        includesText: doc.includesText || fallback?.includesText,
        rows: doc.rows?.length ? doc.rows : fallback?.rows,
        transferSections: doc.transferSections?.length
          ? doc.transferSections
          : fallback?.transferSections,
        note: doc.note || fallback?.note,
        warning: doc.warning || fallback?.warning,
      };
    });
  } catch {
    return DEFAULT_PACKAGES;
  }
}

/**
 * Returns gallery images grouped by section, with the same fallback behaviour
 * as getPackages.
 */
export async function getGallery(): Promise<Record<GallerySection, GalleryItem[]>> {
  const group = (items: GalleryItem[]) => ({
    dome: items.filter((i) => i.section === "dome"),
    "wildlife-birds": items.filter((i) => i.section === "wildlife-birds"),
    "wildlife-animals": items.filter((i) => i.section === "wildlife-animals"),
  });

  if (!hasDatabaseConfig()) {
    return group(DEFAULT_GALLERY);
  }

  try {
    await connectToDatabase();
    const docs = await GalleryImage.find()
      .sort({ section: 1, order: 1, createdAt: 1 })
      .lean();
    if (!docs.length) {
      return group(DEFAULT_GALLERY);
    }
    return group(
      docs.map((doc) => ({
        section: doc.section as GallerySection,
        src: doc.src,
        alt: doc.alt ?? "",
      }))
    );
  } catch {
    return group(DEFAULT_GALLERY);
  }
}
