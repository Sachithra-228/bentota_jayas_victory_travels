import Link from "next/link";
import {
  CONTACT_EMAIL,
  PHONE_DIGITS,
  PHONE_DISPLAY,
  buildWhatsAppLink,
} from "@/lib/site";

type ContactPageProps = {
  searchParams?: {
    tour?: string;
  };
};

export const metadata = {
  title: "Contact | Bentota Jaya's Victory Travels",
  description:
    "Contact our Bentota-based Sri Lanka travel team for custom itineraries, tour quotes, and WhatsApp planning.",
};

export default function ContactPage({ searchParams }: ContactPageProps) {
  const selectedTour = searchParams?.tour
    ? decodeURIComponent(searchParams.tour)
    : null;

  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="container py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
            Contact us
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
            Tell us your travel dates and we will shape the route
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            Share your arrival date, number of travelers, preferred destinations,
            hotel level, and travel style. We can suggest a practical Sri Lanka
            itinerary with pricing guidance.
          </p>
          {selectedTour && (
            <div className="mt-5 inline-flex rounded-full bg-brand-beige px-4 py-2 text-sm font-semibold text-slate-900">
              Requesting quote for: {selectedTour}
            </div>
          )}
        </div>
      </section>

      <section className="py-12">
        <div className="container grid gap-6 md:grid-cols-[1fr,0.9fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">
              Fastest ways to reach us
            </h2>
            <div className="mt-6 grid gap-4">
              <a
                href={`tel:${PHONE_DIGITS}`}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
                  Call
                </div>
                <div className="mt-2 text-xl font-semibold text-slate-900">
                  {PHONE_DISPLAY}
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Best for urgent arrival-day, transfer, or timing questions.
                </p>
              </a>

              <a
                href={buildWhatsAppLink(
                  selectedTour
                    ? `Hello, I would like a quote for ${selectedTour}.`
                    : "Hello, I would like help planning a Sri Lanka trip."
                )}
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
                  WhatsApp
                </div>
                <div className="mt-2 text-xl font-semibold text-slate-900">
                  Direct trip planning chat
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Quickest option for sending dates, hotel style, and route
                  preferences.
                </p>
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
                  Email
                </div>
                <div className="mt-2 text-xl font-semibold text-slate-900">
                  {CONTACT_EMAIL}
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Good for longer trip briefs with more detailed requirements.
                </p>
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold">What to send us</h2>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-300">
              <li className="rounded-3xl bg-white/5 px-4 py-3">
                Arrival and departure dates
              </li>
              <li className="rounded-3xl bg-white/5 px-4 py-3">
                Number of adults and children
              </li>
              <li className="rounded-3xl bg-white/5 px-4 py-3">
                Places you want to include, such as Bentota, Ella, Kandy, or
                Yala
              </li>
              <li className="rounded-3xl bg-white/5 px-4 py-3">
                Preferred hotel level and overall budget range
              </li>
              <li className="rounded-3xl bg-white/5 px-4 py-3">
                Whether you want a slow beach stay or a full island circuit
              </li>
            </ul>

            <div className="mt-6 rounded-3xl bg-brand-teal/20 p-5 text-sm leading-6 text-slate-200">
              If you are not sure which route to choose, start with the tours
              page and we can customize any of them.
            </div>

            <div className="mt-6">
              <Link
                href="/tours"
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900"
              >
                Browse sample tours
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
