"use client";

import { useEffect, useState } from "react";

type HeroImage = {
  url: string;
  location: string;
  title: string;
  caption: string;
};

type HeroCarouselProps = {
  images: HeroImage[];
};

export default function HeroCarousel({ images }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [images.length]);

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((image, index) => (
        <article
          key={image.title}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${image.url}')` }}
        />
      ))}

      <button
        type="button"
        aria-label="Previous hero image"
        onClick={showPrevious}
        className="absolute left-4 top-[58%] z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-slate-950/30 text-white backdrop-blur transition hover:bg-slate-950/50 focus:outline-none focus:ring-2 focus:ring-white/80 md:left-8"
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next hero image"
        onClick={showNext}
        className="absolute right-4 top-[58%] z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-slate-950/30 text-white backdrop-blur transition hover:bg-slate-950/50 focus:outline-none focus:ring-2 focus:ring-white/80 md:right-8"
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      <div className="absolute bottom-24 left-1/2 z-20 w-[min(92%,48rem)] -translate-x-1/2 rounded-3xl border border-white/25 bg-slate-950/20 px-6 py-5 text-center text-white shadow-2xl shadow-slate-950/25 backdrop-blur-md [text-shadow:0_3px_16px_rgba(0,0,0,0.75)] md:bottom-28">
        <div className="text-[11px] uppercase tracking-[0.24em] text-white/90">
          {images[activeIndex].location}
        </div>
        <div className="mt-2 text-2xl font-semibold md:text-4xl">
          {images[activeIndex].title}
        </div>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/95 md:text-base">
          {images[activeIndex].caption}
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-2 md:bottom-16">
        {images.map((image, index) => (
          <button
            key={image.title}
            type="button"
            aria-label={`Show ${image.title}`}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === activeIndex
                ? "w-8 bg-white"
                : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
