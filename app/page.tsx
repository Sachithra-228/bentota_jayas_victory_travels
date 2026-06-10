import FAQSection from "@/components/FAQSection";
import HeroCarousel from "@/components/HeroCarousel";
import Link from "next/link";
import WhyTravelReveal from "@/components/WhyTravelReveal";
import StoriesSection from "@/components/StoriesSection";
import CircularGalleriesSection from "@/components/CircularGalleriesSection";

export const metadata = {
  title: "Explore Sri Lanka with confidence | Bentota Jaya's Victory Travels",
  description:
    "Handpicked Sri Lanka tours crafted by local experts. Beach escapes, cultural journeys, wildlife safaris, honeymoons and family holidays.",
};

export default async function HomePage() {
  const heroImages = [
    {
      url: "/images/hero_5.jpg",
      location: "Southern Coast",
      title: "Tropical palm coast escapes",
      caption: "Sunlit coastlines, swaying palms, and serene beach moments.",
    },
    {
      url: "/images/hero_1.jpg",
      location: "Bentota",
      title: "Bentota beach mornings",
      caption: "Golden coastline and calm tropical mornings by the sea.",
    },
    {
      url: "/images/hero_2.jpg",
      location: "Hill Country",
      title: "Hill country rail views",
      caption: "Scenic climbs through misty mountains and tea estates.",
    },
  ];

  return (
    <div className="-mt-32 bg-slate-50 md:-mt-36">
      <section className="relative min-h-[44rem] overflow-hidden pb-44 pt-20 md:min-h-[50rem] md:pb-52 md:pt-32">
        <HeroCarousel images={heroImages} />

        <div className="container relative z-10 flex flex-col items-center text-center">
          <div className="rounded-[2rem] border border-white/25 bg-slate-950/20 px-5 py-7 text-white shadow-2xl shadow-slate-950/25 backdrop-blur-md [text-shadow:0_3px_18px_rgba(0,0,0,0.7)] md:px-12 md:py-9">
            <h1 className="max-w-4xl font-serif text-4xl font-semibold leading-[1.05] md:text-6xl">
              Curated Island Adventures Crafted By Local Experts
            </h1>
            <p className="mt-5 text-sm leading-7 md:whitespace-nowrap md:text-base">
              Explore beaches, mountains, culture, and wildlife with private
              routes designed around your travel pace.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/packages"
                className="inline-flex items-center rounded-full bg-violet-400 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/35 hover:bg-violet-300"
              >
                Explore Packages
              </Link>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-30 h-20 md:h-28">
          <svg
            className="h-full w-full"
            viewBox="0 0 1200 140"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,60 C220,140 980,140 1200,60 L1200,140 L0,140 Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      <WhyTravelReveal />
      <StoriesSection />
      <CircularGalleriesSection />
      <FAQSection />
    </div>
  );
}
