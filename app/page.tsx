import FAQSection from "@/components/FAQSection";
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
      <section className="relative overflow-hidden pb-24 pt-20 md:pb-28 md:pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2e1f70] via-[#3f2c97] to-[#1d1b6e]" />
        <div className="absolute left-[-8rem] top-8 h-64 w-64 rounded-full bg-purple-300/20 blur-3xl" />
        <div className="absolute right-[-10rem] top-14 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

        <div className="container relative z-10 flex flex-col items-center text-center">
          <h1 className="max-w-4xl font-serif text-4xl font-semibold leading-[1.05] text-white md:text-6xl">
            Curated Island Adventures Crafted By Local Experts
          </h1>
          <p className="mt-5 text-sm leading-7 text-violet-100 md:whitespace-nowrap md:text-base">
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

          <div className="relative mt-10 w-full max-w-5xl px-2 md:px-10">
            <div
              className="relative h-[16rem] overflow-hidden rounded-[1.8rem] border-[6px] border-violet-400 bg-slate-200 bg-cover bg-center bg-no-repeat shadow-[0_24px_40px_rgba(31,18,73,0.42)] md:h-[25rem]"
              style={{ backgroundImage: `url('${heroImages[0].url}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-left text-white md:p-7">
                <div className="text-[11px] uppercase tracking-[0.24em] text-violet-100/85">
                  {heroImages[0].location}
                </div>
                <div className="mt-2 text-xl font-semibold md:text-3xl">
                  {heroImages[0].title}
                </div>
              </div>
            </div>

            {heroImages.slice(1).map((image, index) => (
              <article
                key={image.title}
                className={`absolute top-1/2 hidden h-40 w-44 -translate-y-1/2 overflow-hidden rounded-3xl border border-white/35 bg-slate-100/10 shadow-xl backdrop-blur-md lg:block ${
                  index === 0 ? "-left-4 -rotate-6" : "-right-4 rotate-6"
                }`}
              >
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${image.url}')` }}
                />
              </article>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-20 md:h-28">
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
