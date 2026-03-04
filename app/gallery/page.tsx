import { GALLERY_IMAGES } from "@/lib/site";

export const metadata = {
  title: "Sri Lanka Gallery | Bentota Jaya's Victory Travels",
  description:
    "A visual look at Bentota beaches, tea country, safari routes, heritage locations, and scenic Sri Lanka stays.",
};

export default function GalleryPage() {
  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="container py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
            Gallery
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
            Sri Lanka scenes that shape the routes we plan
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
            Coastline, hill country, heritage stops, and wildlife moments. We
            use this mix of landscapes to build itineraries with better pacing
            and variety.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {GALLERY_IMAGES.map((image) => (
            <article
              key={image.title}
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm"
            >
              <div
                className="h-72 w-full bg-slate-200 bg-cover bg-center"
                style={{ backgroundImage: `url('${image.url}')` }}
              />
              <div className="p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
                  {image.location}
                </div>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">
                  {image.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {image.caption}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
