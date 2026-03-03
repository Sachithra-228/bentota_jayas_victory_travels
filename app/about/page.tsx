import Image from "next/image";
import { BRAND_NAME, GALLERY_IMAGES, PHONE_DISPLAY } from "@/lib/site";

const VALUES = [
  {
    title: "Local knowledge",
    body: "We plan using actual Sri Lanka travel timings, practical hotel pairings, and routes that feel comfortable on the road.",
  },
  {
    title: "Clear communication",
    body: "Before arrival and during the trip, guests can reach us quickly for updates, timing changes, or support.",
  },
  {
    title: "Flexible itineraries",
    body: "We treat sample tours as a base, then tune the duration, hotels, and pace around your priorities.",
  },
];

export const metadata = {
  title: "About Us | Bentota Jaya's Victory Travels",
  description:
    "Learn about our Bentota-based Sri Lankan travel team, our planning approach, and how we build tailor-made holidays.",
};

export default function AboutPage() {
  const feature = GALLERY_IMAGES[0];

  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="container grid gap-8 py-12 md:grid-cols-[1fr,0.9fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
              About {BRAND_NAME}
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
              Bentota-based planning with island-wide travel experience
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              We help visitors travel Sri Lanka with fewer logistics worries and
              better local coordination. That means cleaner transport planning,
              realistic day flow, responsive support, and routes that match the
              way you actually want to travel.
            </p>
            <div className="mt-6 rounded-3xl bg-brand-beige p-5 text-sm text-slate-700">
              Direct travel support available on {PHONE_DISPLAY} for quote
              requests, itinerary changes, and pre-arrival questions.
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo.png"
                alt={BRAND_NAME}
                width={84}
                height={84}
                className="h-20 w-20 rounded-[1.75rem] object-cover"
              />
              <div>
                <div className="text-lg font-semibold text-slate-900">
                  {BRAND_NAME}
                </div>
                <div className="text-sm text-slate-500">
                  Sri Lanka travel specialists
                </div>
              </div>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <div className="rounded-3xl bg-white p-4 text-center">
                <div className="text-2xl font-semibold text-slate-900">10+</div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Years
                </div>
              </div>
              <div className="rounded-3xl bg-white p-4 text-center">
                <div className="text-2xl font-semibold text-slate-900">24/7</div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Support
                </div>
              </div>
              <div className="rounded-3xl bg-white p-4 text-center">
                <div className="text-2xl font-semibold text-slate-900">100%</div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Custom
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container grid gap-5 md:grid-cols-3">
          {VALUES.map((value) => (
            <article
              key={value.title}
              className="rounded-[2rem] bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {value.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {value.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-14">
        <div className="container rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-8 md:grid-cols-[1fr,0.95fr] md:items-center">
            <div
              className="min-h-[20rem] rounded-[2rem] bg-slate-200 bg-cover bg-center"
              style={{ backgroundImage: `url('${feature.url}')` }}
            />
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
                {feature.location}
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                Why guests start with Bentota and build outward
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Bentota gives easy access to beach stays, Galle day trips,
                Colombo transfers, and onward routes inland. That makes it a
                strong base for both short escapes and full-island journeys.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
