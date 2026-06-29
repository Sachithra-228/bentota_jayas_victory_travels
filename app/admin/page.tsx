import PackagesManager, {
  type AdminPackage,
} from "@/components/admin/PackagesManager";
import { connectToDatabase, hasDatabaseConfig } from "@/lib/db";
import { Package } from "@/models/Package";
import { serializePackage } from "@/lib/serialize";

export const dynamic = "force-dynamic";

export default async function AdminPackagesPage() {
  if (!hasDatabaseConfig()) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
        The database is not configured. Add <code>MONGODB_URI</code> to your
        environment to manage packages.
      </div>
    );
  }

  let initial: AdminPackage[] = [];
  try {
    await connectToDatabase();
    const docs = await Package.find().sort({ order: 1, createdAt: 1 }).lean();
    initial = docs.map(serializePackage);
  } catch {
    initial = [];
  }

  return <PackagesManager initial={initial} />;
}
