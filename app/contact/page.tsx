import Link from "next/link";
import {
  BRAND_NAME,
  CONTACT_EMAIL,
  PHONE_DIGITS,
  PHONE_DISPLAY,
  buildWhatsAppLink,
} from "@/lib/site";

type ContactPageProps = {
  searchParams?: {
    tour?: string;
    package?: string;
  };
};

export const metadata = {
  title: "Contact | Bentota Jaya's Victory Travels",
  description:
    "Contact our Bentota-based Sri Lanka travel team for custom itineraries, tour quotes, and WhatsApp planning.",
};

export default function ContactPage({ searchParams }: ContactPageProps) {
  const selectedPackage = searchParams?.package
    ? decodeURIComponent(searchParams.package)
    : searchParams?.tour
      ? decodeURIComponent(searchParams.tour)
    : null;

  return (
    <div className="-mt-32 bg-slate-50 md:-mt-36">
      <section className="relative overflow-hidden border-b border-cyan-300/20 bg-[#120F17] pt-32 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.15),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_50%)]" />
        <div className="container relative grid gap-8 pb-12 pt-10 md:grid-cols-[1fr,1fr] md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              About {BRAND_NAME}
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-cyan-50 md:text-4xl">
              Bentota-based team with island-wide travel planning support
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-cyan-100/85">
              We coordinate practical routes, private transport flow, and quick
              support so your Sri Lanka trip moves smoothly from arrival to
              departure.
            </p>
            <div className="mt-5 inline-flex rounded-full bg-cyan-300/20 px-4 py-2 text-sm font-semibold text-cyan-100">
              Direct support on {PHONE_DISPLAY}
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-200/20 bg-slate-950/40 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Contact us
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-cyan-50 md:text-3xl">
              Tell us your travel dates and we will shape the route
            </h2>
            <p className="mt-4 text-sm leading-7 text-cyan-100/85">
              Share your arrival date, number of travelers, preferred
              destinations, hotel level, and travel style. We can suggest a
              practical Sri Lanka itinerary with pricing guidance.
            </p>
            {selectedPackage && (
              <div className="mt-5 inline-flex rounded-full bg-cyan-300/20 px-4 py-2 text-sm font-semibold text-cyan-100">
                Requesting quote for: {selectedPackage}
              </div>
            )}
          </div>
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
                  selectedPackage
                    ? `Hello, I would like a quote for ${selectedPackage}.`
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
              If you are not sure which route to choose, open the Packages page
              and we can help you choose and customize one.
            </div>

            <div className="mt-6 flex justify-center">
              <Link
                href="/packages"
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900"
              >
                Browse Packages
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
