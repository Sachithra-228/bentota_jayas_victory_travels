import Link from "next/link";

const CATEGORIES = [
  { slug: "beach", label: "Beach escapes" },
  { slug: "wildlife", label: "Wildlife & safaris" },
  { slug: "culture", label: "Culture & heritage" },
  { slug: "honeymoon", label: "Honeymoons" },
  { slug: "family", label: "Family holidays" },
];

export default function CategoryChips() {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.slug}
          href={`/tours?category=${cat.slug}`}
          className="inline-flex items-center rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-200 hover:border-brand-teal/40 hover:text-brand-teal"
        >
          {cat.label}
        </Link>
      ))}
    </div>
  );
}

