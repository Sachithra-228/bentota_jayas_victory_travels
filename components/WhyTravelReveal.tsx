"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const highlights = [
  "Private route planning with practical timing",
  "Trusted local drivers and handpicked stays",
  "Fast support before and during your journey",
];

export default function WhyTravelReveal() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 md:py-20">
      <div className="container">
        <div className="grid items-center gap-8 md:grid-cols-[1fr,1fr] md:gap-12">
          <div>
            <p
              className={`text-sm font-semibold uppercase tracking-[0.28em] text-brand-teal transition-all duration-700 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              Why travel with us
            </p>
            <h2
              className={`mt-3 font-serif text-4xl font-semibold leading-[1.05] text-slate-900 transition-all duration-700 md:text-6xl ${
                visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              Local expertise with routes that feel effortless.
            </h2>
            <p
              className={`mt-5 max-w-2xl text-base leading-8 text-slate-600 transition-all delay-100 duration-700 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              We design each day around real distance, comfort, and your travel
              style so your Sri Lanka journey feels smooth from arrival to return.
            </p>
            <div className="mt-7 grid gap-3">
              {highlights.map((item, index) => (
                <article
                  key={item}
                  className={`group relative overflow-hidden rounded-2xl border border-violet-400/70 bg-gradient-to-r from-violet-200/80 via-fuchsia-100/65 to-violet-300/80 px-4 py-3 shadow-sm shadow-violet-300/25 transition-all duration-700 hover:-translate-y-0.5 hover:border-violet-500 hover:shadow-md hover:shadow-violet-300/40 ${
                    visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${150 + index * 100}ms`,
                  }}
                >
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-violet-400/20" />
                  <span className="pointer-events-none absolute inset-x-5 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100 animate-pulse" />
                  <div className="relative flex items-center">
                    <p className="text-base font-medium text-slate-700">{item}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div
            className={`flex items-center justify-center transition-all duration-900 ${
              visible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
            }`}
          >
            <Image
              src="/images/newlogo.png"
              alt="Bentota Jaya logo"
              width={820}
              height={500}
              className="h-auto w-full max-w-[42rem] object-contain"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
