import Link from "next/link";
import type { SerializedTour } from "@/lib/tours";
import { getTourImage } from "@/lib/site";
import { formatLkr } from "@/lib/pricing";

function titleCase(input: string) {
  return input
    .split(/[\s-_]+/g)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export default function TourCard({ tour }: { tour: SerializedTour }) {
  const cover = getTourImage(tour.category);

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-soft transition-shadow">
      <Link href={`/tours/${tour.slug}`} className="block">
        <div className="relative">
          <div
            className="h-44 w-full bg-slate-100 bg-cover bg-center"
            style={{ backgroundImage: `url('${cover}')` }}
          />
          <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-brand-teal border border-brand-teal/15">
            {titleCase(tour.category)}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-sm font-semibold text-slate-900 group-hover:text-brand-teal transition-colors line-clamp-2">
            {tour.title}
          </h3>
          <p className="mt-1 text-xs text-slate-600 line-clamp-2">
            {tour.destination}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-900">
                {tour.durationDays} days
              </span>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-slate-500">From</div>
              <div className="text-sm font-semibold text-slate-900">
                {formatLkr(tour.priceFrom)}
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <div className="flex items-center gap-2">
          <Link
            href={`/tours/${tour.slug}`}
            className="flex-1 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:border-brand-teal/40 hover:text-brand-teal"
          >
            View details
          </Link>
          <Link
            href={`/contact?tour=${encodeURIComponent(tour.slug)}`}
            className="flex-1 inline-flex items-center justify-center rounded-full bg-brand-teal px-4 py-2 text-xs font-semibold text-white shadow-soft hover:bg-brand-lightTeal"
          >
            Request quote
          </Link>
        </div>
      </div>
    </article>
  );
}

