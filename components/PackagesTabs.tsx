"use client";

import Image from "next/image";
import { useState } from "react";
import type { PackageTab } from "@/lib/defaultContent";

export default function PackagesTabs({ tabs }: { tabs: PackageTab[] }) {
  const packageTabs = tabs.length ? tabs : [];
  const [activeTab, setActiveTab] = useState(packageTabs[0]?.slug ?? "");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!packageTabs.length) {
    return (
      <section className="pb-16 pt-6 md:pt-8">
        <div className="container">
          <p className="text-center text-cyan-100/80">
            No packages are available right now. Please check back soon.
          </p>
        </div>
      </section>
    );
  }

  const currentTab =
    packageTabs.find((item) => item.slug === activeTab) ?? packageTabs[0];
  const images = currentTab.images.length
    ? currentTab.images
    : ["/images/beach.jpg"];

  const showPreviousImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="pb-16 pt-6 md:pt-8">
      <div className="container">
        <div className="overflow-x-auto pb-2">
          <div className="mx-auto flex w-max min-w-full justify-center gap-2 rounded-2xl bg-cyan-200/10 p-2 ring-1 ring-cyan-200/20">
            {packageTabs.map((item) => {
              const isActive = item.slug === currentTab.slug;
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.slug);
                    setActiveImageIndex(0);
                  }}
                  className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-cyan-300/20 text-cyan-100 shadow-sm ring-1 ring-cyan-200/40"
                      : "text-cyan-200/80 hover:text-cyan-100"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          {/* Full-width image banner */}
          <div className="relative h-64 w-full overflow-hidden rounded-2xl md:h-80 lg:h-96">
            <Image
              src={images[activeImageIndex]}
              alt={currentTab.title}
              fill
              className="object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPreviousImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-lg font-bold text-white transition hover:bg-black/60"
                  aria-label="Previous image"
                >
                  {"<"}
                </button>
                <button
                  type="button"
                  onClick={showNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-lg font-bold text-white transition hover:bg-black/60"
                  aria-label="Next image"
                >
                  {">"}
                </button>
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/35 px-3 py-2">
                  {images.map((_, index) => (
                    <button
                      key={`${currentTab.slug}-dot-${index}`}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      className={`h-2.5 w-2.5 rounded-full transition ${
                        index === activeImageIndex
                          ? "bg-white"
                          : "bg-white/45 hover:bg-white/75"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Content below image */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-cyan-50 md:text-3xl">
              {currentTab.title}
            </h2>

            {(currentTab.pickupAreas || currentTab.includesText) && (
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-8">
                {currentTab.pickupAreas && (
                  <p className="text-sm leading-7 text-cyan-100/85">
                    <span className="font-semibold text-cyan-100">Pickup areas: </span>
                    {currentTab.pickupAreas}
                  </p>
                )}
                {currentTab.includesText && (
                  <p className="text-sm leading-7 text-cyan-100/85">
                    <span className="font-semibold text-cyan-100">
                      {currentTab.includesLabel}:{" "}
                    </span>
                    {currentTab.includesText}
                  </p>
                )}
              </div>
            )}

            {currentTab.rows && (
              <div className="mt-6 overflow-hidden rounded-2xl border border-cyan-200/20">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-cyan-200/10">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-cyan-100">Pax</th>
                      <th className="px-4 py-3 font-semibold text-cyan-100">Vehicle</th>
                      <th className="px-4 py-3 text-right font-semibold text-cyan-100">
                        Selling Price (USD)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTab.rows.map((row) => (
                      <tr
                        key={`${row.pax}-${row.vehicle}-${row.price}`}
                        className="border-t border-cyan-200/10"
                      >
                        <td className="px-4 py-3 text-cyan-50/90">{row.pax}</td>
                        <td className="px-4 py-3 text-cyan-50/90">{row.vehicle}</td>
                        <td className="px-4 py-3 text-right font-semibold text-cyan-50">
                          {row.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {currentTab.transferSections && (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {currentTab.transferSections.map((section) => (
                  <div
                    key={section.route}
                    className="overflow-hidden rounded-2xl border border-cyan-200/20"
                  >
                    <div className="bg-cyan-200/10 px-4 py-3 text-sm font-semibold text-cyan-100">
                      {section.route}
                    </div>
                    <table className="w-full border-collapse text-left text-sm">
                      <thead className="bg-transparent">
                        <tr>
                          <th className="px-4 py-3 font-semibold text-cyan-100">Vehicle</th>
                          <th className="px-4 py-3 text-right font-semibold text-cyan-100">
                            Price (USD)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.rows.map((row) => (
                          <tr
                            key={`${section.route}-${row.vehicle}`}
                            className="border-t border-cyan-200/10"
                          >
                            <td className="px-4 py-3 text-cyan-50/90">{row.vehicle}</td>
                            <td className="px-4 py-3 text-right font-semibold text-cyan-50">
                              {row.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}

            {currentTab.note && (
              <p className="mt-5 rounded-xl bg-amber-100/15 px-4 py-3 text-sm text-amber-100">
                <span className="font-semibold">Note: </span>
                {currentTab.note}
              </p>
            )}

            {currentTab.warning && (
              <p className="mt-5 rounded-xl bg-rose-100/15 px-4 py-3 text-sm text-rose-100">
                {currentTab.warning}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
