"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const BIRDS = Array.from({ length: 11 }, (_, i) => ({
  src: `/images/gallery/p${i + 1}.jpeg`,
  alt: `Sri Lanka bird ${i + 1}`,
}));

const ANIMALS = Array.from({ length: 6 }, (_, i) => ({
  src: `/images/gallery/a${i + 1}.jpeg`,
  alt: `Sri Lanka animal ${i + 1}`,
}));

function ChevronLeft() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function Carousel({ items }: { items: { src: string; alt: string }[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir * scrollRef.current.clientWidth * 0.75,
      behavior: "smooth",
    });
  };

  return (
    <div className="group relative">
      {/* Left fade + arrow */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#120F17] to-transparent" />
      <button
        onClick={() => scroll(-1)}
        aria-label="Previous"
        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white opacity-0 ring-1 ring-white/10 transition-all duration-200 hover:bg-cyan-900/70 hover:ring-cyan-400/40 focus:opacity-100 group-hover:opacity-100"
      >
        <ChevronLeft />
      </button>

      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth px-6 py-3 md:gap-4"
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="flex-none overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-cyan-900/30"
            style={{ width: "clamp(220px, 28vw, 320px)", height: "clamp(150px, 18vw, 220px)" }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={320}
              height={220}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 55vw, 30vw"
            />
          </div>
        ))}
      </div>

      {/* Right fade + arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#120F17] to-transparent" />
      <button
        onClick={() => scroll(1)}
        aria-label="Next"
        className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white opacity-0 ring-1 ring-white/10 transition-all duration-200 hover:bg-cyan-900/70 hover:ring-cyan-400/40 focus:opacity-100 group-hover:opacity-100"
      >
        <ChevronRight />
      </button>
    </div>
  );
}

function Section({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: { src: string; alt: string }[];
}) {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-16 md:mt-24">
      <div
        ref={headingRef}
        className="mb-6 text-center md:mb-8"
        style={{
          opacity: 0,
          transform: "translateY(32px)",
          transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        }}
      >
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-cyan-50 md:text-4xl">
          {title}
        </h2>
        <p className="mt-2 text-sm tracking-wide text-cyan-100/50">{subtitle}</p>
      </div>

      <Carousel items={items} />
    </div>
  );
}

export default function WildlifeGallery() {
  return (
    <section className="bg-[#120F17] pb-24 pt-2">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Divider */}
        <div className="flex items-center gap-4 pt-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-200/20 to-cyan-200/20" />
          <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-widest text-cyan-200/40">
            Wildlife Encounters
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-cyan-200/20 to-cyan-200/20" />
        </div>
      </div>

      <Section
        title="Birds of Sri Lanka"
        subtitle="Feathered wonders captured in the wild"
        items={BIRDS}
      />

      <Section
        title="Wild Animals"
        subtitle="The untamed creatures of Sri Lanka's forests and plains"
        items={ANIMALS}
      />
    </section>
  );
}
