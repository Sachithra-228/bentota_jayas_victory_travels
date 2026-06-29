import Link from "next/link";
import CategoryChips from "@/components/CategoryChips";
import TourCard from "@/components/TourCard";
import { getTours } from "@/lib/tours";

type ToursPageProps = {
  searchParams?: {
    category?: string;
  };
};

function titleCase(value?: string) {
  if (!value) return "All";

  return value
    .split(/[\s-_]+/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export const metadata = {
  title: "Sri Lanka Tours | Bentota Jaya's Victory Travels",
  description:
    "Browse private Sri Lanka tours, honeymoon packages, family holidays, beach stays, and wildlife journeys.",
};

export default async function ToursPage({ searchParams }: ToursPageProps) {
  const category = searchParams?.category;
  const tours = await getTours({ category });

  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="container py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
            Sri Lanka tours
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                {titleCase(category)} journeys planned by a local team
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Choose a ready-made route as a starting point, then we can
                adjust hotels, number of days, and pacing to fit your trip.
              </p>
            </div>
            <div className="rounded-full bg-brand-beige px-4 py-2 text-sm font-semibold text-slate-900">
              {tours.length} routes available
            </div>
          </div>

          <div className="mt-6">
            <CategoryChips />
          </div>

          {category && (
            <div className="mt-4">
              <Link
                href="/tours"
                className="text-sm font-semibold text-brand-teal hover:text-brand-lightTeal"
              >
                Clear filter
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          {tours.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-500">
              No tours match this filter yet. Try another category or contact us
              for a custom Sri Lanka itinerary.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour) => (
                <TourCard key={tour._id?.toString() ?? tour.slug} tour={tour} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
