const TESTIMONIALS = [
  {
    name: "Emma & James, UK",
    quote:
      "Our honeymoon route from Bentota to Ella and Kandy was beautifully planned. Drivers were always on time and felt very safe.",
  },
  {
    name: "The Muller family, Germany",
    quote:
      "They listened to our kids' ages and energy levels and adjusted the itinerary so everyone enjoyed both wildlife and beach days.",
  },
  {
    name: "Sanjay, India",
    quote:
      "Transparent communication, no hidden costs and friendly local team. WhatsApp updates before each transfer made it stress-free.",
  },
];

export default function Testimonials() {
  return (
    <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-7">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-lightTeal">
            Guest stories
          </p>
          <h2 className="mt-2 text-2xl font-semibold">What guests say</h2>
        </div>
        <div className="hidden h-10 w-10 rounded-full bg-white/10 md:block" />
      </div>

      <div className="space-y-4">
        {TESTIMONIALS.map((testimonial, index) => (
          <figure
            key={testimonial.name}
            className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-sm text-slate-200 shadow-lg transition-transform duration-300 hover:-translate-y-1"
            style={{
              animation: "testimonial-float 6s ease-in-out infinite",
              animationDelay: `${index * 0.7}s`,
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-3xl leading-none text-brand-lightTeal/80">
                "
              </span>
              <span className="h-2 w-12 rounded-full bg-brand-lightTeal/70" />
            </div>
            <blockquote className="leading-7 text-slate-100">
              {testimonial.quote}
            </blockquote>
            <figcaption className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
              {testimonial.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
