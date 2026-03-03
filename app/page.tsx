import FAQSection from "@/components/FAQSection";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";
import TourCard from "@/components/TourCard";
import { getFeaturedTours } from "@/lib/tours";
import { GALLERY_IMAGES, PHONE_DISPLAY, PHONE_DIGITS } from "@/lib/site";

export const metadata = {
  title: "Explore Sri Lanka with confidence | Bentota Jaya's Victory Travels",
  description:
    "Handpicked Sri Lanka tours crafted by local experts. Beach escapes, cultural journeys, wildlife safaris, honeymoons and family holidays.",
};

export default async function HomePage() {
  const tours = await getFeaturedTours();
  const heroImages = GALLERY_IMAGES.slice(0, 3);
  const experienceCards = GALLERY_IMAGES.slice(3);

  return (
    <div className="bg-slate-50">
      <section className="relative overflow-hidden pb-12">
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-gradient-to-br from-brand-beige via-white to-teal-50" />
        <div className="absolute left-[-8rem] top-20 h-56 w-56 rounded-full bg-brand-teal/10 blur-3xl" />
        <div className="absolute right-[-6rem] top-8 h-64 w-64 rounded-full bg-brand-lightTeal/15 blur-3xl" />

        <div className="container relative grid gap-10 py-8 md:grid-cols-[1.08fr,0.92fr] md:py-12">
          <div className="pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-teal">
              Sri Lanka travel, planned locally
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
              Beautiful Sri Lanka journeys, planned with local care.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              Beach days, hill-country views, and smooth private travel, all
              arranged by a trusted local team.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/tours"
                className="inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-slate-800"
              >
                View Sri Lanka tours
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-brand-teal/20 bg-white px-6 py-3 text-sm font-semibold text-brand-teal hover:border-brand-teal/40"
              >
                Request custom itinerary
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:grid-rows-[1.2fr,0.8fr]">
            <div
              className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-slate-200 shadow-soft md:col-span-2"
              style={{ backgroundImage: `url('${heroImages[0].url}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/5 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="text-xs uppercase tracking-[0.24em] text-white/75">
                  {heroImages[0].location}
                </div>
                <div className="mt-2 text-2xl font-semibold">
                  {heroImages[0].title}
                </div>
                <p className="mt-2 max-w-md text-sm text-white/85">
                  {heroImages[0].caption}
                </p>
              </div>
            </div>

            {heroImages.slice(1).map((image) => (
              <div
                key={image.title}
                className="relative min-h-[15rem] overflow-hidden rounded-[2rem] border border-white/70 bg-slate-200 shadow-soft"
                style={{ backgroundImage: `url('${image.url}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <div className="text-[11px] uppercase tracking-[0.24em] text-white/75">
                    {image.location}
                  </div>
                  <div className="mt-2 text-lg font-semibold">{image.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-14">
        <div className="container">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
                Featured routes
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
                Popular Sri Lanka tour packages
              </h2>
            </div>
            <Link
              href="/tours"
              className="text-sm font-semibold text-brand-teal hover:text-brand-lightTeal"
            >
              Browse all tours
            </Link>
          </div>

          {tours.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
              Tours will appear here once they are available.
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

      <section className="border-y border-slate-200 bg-white py-14">
        <div className="container">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
                Built around the island
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
                Travel styles we plan every week
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              We balance transit times, hotel quality, sightseeing pace, and
              your budget so the route feels smooth instead of overpacked.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {experienceCards.map((card) => (
              <article
                key={card.title}
                className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50"
              >
                <div
                  className="h-56 w-full bg-slate-200 bg-cover bg-center"
                  style={{ backgroundImage: `url('${card.url}')` }}
                />
                <div className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
                    {card.location}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {card.caption}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-beige/40 py-14">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-[1fr,0.9fr]">
            <div className="rounded-[2rem] bg-white p-7 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
                Why travel with us
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Local planning with practical support
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <div className="text-sm font-semibold text-slate-900">
                    Local driver network
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    We schedule trusted private drivers who know the actual road
                    conditions, not just map times.
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <div className="text-sm font-semibold text-slate-900">
                    Real pace planning
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    We avoid rushed itineraries and adjust routes around your
                    arrival time, children, and travel style.
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <div className="text-sm font-semibold text-slate-900">
                    Clear pricing
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    You get transparent inclusions, exclusions, and sensible hotel
                    options before confirming.
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <div className="text-sm font-semibold text-slate-900">
                    Fast support
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Need a same-day change during the trip? We stay reachable on{" "}
                    {PHONE_DISPLAY}.
                  </p>
                </div>
              </div>
            </div>

            <Testimonials />
          </div>

          <FAQSection />
        </div>
      </section>

      <section className="py-14">
        <div className="container">
          <div className="rounded-[2rem] bg-slate-900 px-6 py-8 text-white md:px-10 md:py-10">
            <div className="grid gap-6 md:grid-cols-[1fr,auto] md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-lightTeal">
                  Start planning
                </p>
                <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
                  Tell us your dates, interests, and budget. We will shape the
                  route around you.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                  Honeymoon, family holiday, beach stay, wildlife loop, or a
                  full island circuit. We can draft a private Sri Lanka plan
                  with hotel ideas and transport flow.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900"
                >
                  Build my itinerary
                </Link>
                <a
                  href={`tel:${PHONE_DIGITS}`}
                  className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white"
                >
                  Call {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
