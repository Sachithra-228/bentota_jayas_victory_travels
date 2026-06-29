import GalleryManager, {
  type AdminGalleryImage,
} from "@/components/admin/GalleryManager";
import { connectToDatabase, hasDatabaseConfig } from "@/lib/db";
import { GalleryImage } from "@/models/GalleryImage";
import { serializeGalleryImage } from "@/lib/serialize";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  if (!hasDatabaseConfig()) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
        The database is not configured. Add <code>MONGODB_URI</code> to your
        environment to manage gallery images.
      </div>
    );
  }

  let initial: AdminGalleryImage[] = [];
  try {
    await connectToDatabase();
    const docs = await GalleryImage.find()
      .sort({ section: 1, order: 1, createdAt: 1 })
      .lean();
    initial = docs.map(serializeGalleryImage);
  } catch {
    initial = [];
  }

  return <GalleryManager initial={initial} />;
}
