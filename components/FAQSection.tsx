const FAQS = [
  {
    question: "Can you customize any tour package?",
    answer:
      "Yes. We can adjust destinations, number of days, hotel category, transport type, and the daily pace around your travel style.",
  },
  {
    question: "Do you provide airport pickup and private transport?",
    answer:
      "Yes. Most routes can include airport transfers and a private Sri Lankan driver for the full journey.",
  },
  {
    question: "Can I plan a honeymoon or family trip by WhatsApp?",
    answer:
      "Yes. Send your dates, traveler count, and preferred places, and we can start building the route directly on WhatsApp.",
  },
  {
    question: "How quickly can you send a quote?",
    answer:
      "For most requests, we can share a first itinerary idea and pricing guidance within 24 hours.",
  },
];

export default function FAQSection() {
  return (
    <div className="mt-10 rounded-[2rem] bg-slate-900 p-6 text-white shadow-soft md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-lightTeal">
            FAQ
          </p>
          <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
            Questions travelers ask before booking
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-300">
          Clear answers before you travel, so planning feels simple from the
          first message.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {FAQS.map((item) => (
          <details
            key={item.question}
            className="group rounded-3xl bg-white/5 p-5 transition-colors open:bg-white/10"
          >
            <summary className="cursor-pointer list-none pr-8 text-sm font-semibold text-white">
              {item.question}
            </summary>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
