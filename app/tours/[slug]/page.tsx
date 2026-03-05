import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatLkr } from "@/lib/pricing";
import { getTourBySlug } from "@/lib/tours";
import { PHONE_DISPLAY, buildWhatsAppLink } from "@/lib/site";

type TourDetailPageProps = {
  params: {
    slug: string;
  };
};

function titleCase(value: string) {
  return value
    .split(/[\s-_]+/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export async function generateMetadata({
  params,
}: TourDetailPageProps): Promise<Metadata> {
  const tour = await getTourBySlug(params.slug);

  if (!tour) {
    return {
      title: "Tour not found | Bentota Jaya's Victory Travels",
    };
  }

  return {
    title: `${tour.title} | Bentota Jaya's Victory Travels`,
    description:
      "description" in tour && typeof tour.description === "string"
        ? tour.description
        : `${tour.destination}. ${tour.durationDays} days from ${formatLkr(
            tour.priceFrom
          )}.`,
  };
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const tour = await getTourBySlug(params.slug);

  if (!tour) {
    notFound();
  }

  const cover =
    (Array.isArray(tour.images) && tour.images[0]) ||
    "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg";

  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="container py-12">
          <Link
            href="/tours"
            className="text-sm font-semibold text-brand-teal hover:text-brand-lightTeal"
          >
            Back to tours
          </Link>

          <div className="mt-5 grid gap-8 md:grid-cols-[1fr,0.9fr] md:items-start">
            <div>
              <div className="inline-flex items-center rounded-full bg-brand-beige px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
                {titleCase(tour.category)}
              </div>
              <h1 className="mt-4 text-3xl font-semibold text-slate-900 md:text-4xl">
                {tour.title}
              </h1>
              <p className="mt-3 text-base text-slate-600">{tour.destination}</p>
              {"description" in tour && tour.description && (
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  {tour.description}
                </p>
              )}

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Duration
                  </div>
                  <div className="mt-2 text-lg font-semibold text-slate-900">
                    {tour.durationDays} days
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Price from
                  </div>
                  <div className="mt-2 text-lg font-semibold text-slate-900">
                    {formatLkr(tour.priceFrom)}
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Contact
                  </div>
                  <div className="mt-2 text-lg font-semibold text-slate-900">
                    {PHONE_DISPLAY}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/contact?tour=${encodeURIComponent(tour.slug)}`}
                  className="inline-flex items-center rounded-full bg-brand-teal px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-brand-lightTeal"
                >
                  Request quote
                </Link>
                <a
                  href={buildWhatsAppLink(
                    `Hello, I would like a quote for ${tour.title}.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-brand-teal/25 bg-white px-6 py-3 text-sm font-semibold text-brand-teal"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>

            <div
              className="min-h-[22rem] rounded-[2rem] bg-slate-200 bg-cover bg-center shadow-soft"
              style={{ backgroundImage: `url('${cover}')` }}
            />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container grid gap-6 md:grid-cols-3">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Highlights</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {tour.highlights.map((item) => (
                <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Included</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {tour.inclusions.map((item) => (
                <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Not included</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {tour.exclusions.map((item) => (
                <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-14">
        <div className="container rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            Sample itinerary flow
          </h2>

          {tour.itinerary.length === 0 ? (
            <p className="mt-4 text-sm leading-6 text-slate-600">
              This route is fully customizable. We will prepare a detailed
              day-by-day itinerary based on your preferred travel dates, hotel
              style, and pace.
            </p>
          ) : (
            <div className="mt-6 grid gap-4">
              {tour.itinerary.map((item) => (
                <div
                  key={`${item.day}-${item.title}`}
                  className="rounded-3xl bg-slate-50 p-5"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
                    Day {item.day}
                  </div>
                  <div className="mt-2 text-lg font-semibold text-slate-900">
                    {item.title}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
