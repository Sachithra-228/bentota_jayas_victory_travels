import PackagesTabs from "@/components/PackagesTabs";
import { getPackages } from "@/lib/content";

export const metadata = {
  title: "Packages | Bentota Jaya's Victory Travels",
  description:
    "Explore Sri Lanka travel packages from Bentota Jaya's Victory Travels.",
};

export const dynamic = "force-dynamic";

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <div className="-mt-32 min-h-screen bg-[#120F17] md:-mt-36">
      <section className="border-b border-slate-200 bg-white pt-32 md:pt-36">
        <div className="container pb-8 text-center md:pb-10">
          <h1 className="mx-auto max-w-5xl font-serif text-4xl font-semibold leading-[1.1] text-slate-900 md:text-6xl">
            Tour packages with route details and fixed selling prices in USD
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-700">
            Select each tab to view inclusions, pickup areas, vehicle type, and
            pricing by person. Use the quote button inside each tab to contact us
            directly for booking.
          </p>
        </div>
      </section>

      <PackagesTabs tabs={packages} />
    </div>
  );
}
