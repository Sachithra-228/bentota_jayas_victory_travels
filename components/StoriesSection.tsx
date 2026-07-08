"use client";

import { useState } from "react";
import DotField from "@/components/DotField";

const STORIES = [
  {
    name: "Sophie Carter, United Kingdom",
    title: "Couple Adventure Route",
    quote:
      "From beach sunrise to hill-country views, every stop was perfectly timed. The trip felt effortless and premium from start to finish.",
  },
  {
    name: "Lucas Meyer, Germany",
    title: "Family Holiday Tour",
    quote:
      "Great communication, safe driving, and flexible day plans for our children. We could actually relax and enjoy each destination.",
  },
  {
    name: "Ethan Brooks, Australia",
    title: "Private Island Explorer",
    quote:
      "Excellent private transport and clear pricing. Real-time WhatsApp updates and local tips made the whole journey smooth and stress-free.",
  },
];

export default function StoriesSection() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#25105f] via-[#301a7a] to-[#1f0c52] py-14 md:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <DotField
          dotRadius={1.6}
          dotSpacing={13}
          bulgeStrength={60}
          glowRadius={180}
          sparkle={false}
          waveAmplitude={0.18}
          gradientFrom="rgba(196, 133, 255, 0.28)"
          gradientTo="rgba(158, 91, 255, 0.2)"
          glowColor="#7a3cff"
        />
      </div>
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-fuchsia-300/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-violet-400/12 blur-3xl" />

      <div className="container relative">
        <div className="mb-10 space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-200">
            Testimonials
          </p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Stories from our traveler community
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-violet-100/90 md:text-base">
            Real international guest experiences and how Bentota Jaya made each trip smooth, safe, and memorable.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {STORIES.map((story, index) => (
            <button
              key={story.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative flex h-full flex-col rounded-[1.7rem] border p-6 text-left transition-all duration-300 md:p-8 ${
                index === activeIndex
                  ? "border-violet-200/70 bg-white shadow-2xl shadow-violet-950/35"
                  : "border-white/20 bg-white/95 hover:-translate-y-1 hover:border-violet-200"
              }`}
            >
              <p className="text-[2rem] leading-none text-violet-300">"</p>
              <p className="mt-4 text-[1.65rem] font-serif italic leading-tight text-slate-900">
                {story.name}
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.16em] text-slate-500">
                {story.title}
              </p>
              <p className="mt-4 text-[0.98rem] leading-7 text-slate-800">
                {story.quote}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
