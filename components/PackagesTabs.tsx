"use client";

import Image from "next/image";
import { useState } from "react";

type TourRow = {
  pax: string;
  vehicle: string;
  price: string;
};

type TransferRow = {
  vehicle: string;
  price: string;
};

type TransferSection = {
  route: string;
  rows: TransferRow[];
};

type PackageTab = {
  id: string;
  label: string;
  title: string;
  images: string[];
  pickupAreas?: string;
  includesLabel?: string;
  includesText?: string;
  rows?: TourRow[];
  transferSections?: TransferSection[];
  note?: string;
  warning?: string;
};

const PACKAGE_TABS: PackageTab[] = [
  {
    id: "kandy",
    label: "Kandy",
    title: "Kandy Day Tour",
    images: [
      "/images/kandy/Kandy.jpg",
      "/images/kandy/Best-Travel-Guide-Kandy-Sri-Lanka-32.jpg",
      "/images/kandy/c2013ecda875e6e310d3a00950c3c62b.jpg",
      "/images/kandy/97b519f8d032524bb22d25b0caac4d80.jpg",
    ],
    pickupAreas:
      "Bentota, Ahungalla, Kosgoda, Beruwala, Kalutara, Wadduwa, Colombo, Katunayake, Negombo.",
    rows: [
      { pax: "1 Pax", vehicle: "Car", price: "$270" },
      { pax: "2 Pax", vehicle: "Car", price: "$333" },
      { pax: "3 Pax", vehicle: "Car", price: "$410" },
      { pax: "4 Pax", vehicle: "Van", price: "$525" },
    ],
    note: "Children and baby prices may vary.",
  },
  {
    id: "yala",
    label: "Yala",
    title: "Yala National Park Day Tour",
    images: [
      "/images/yala/yala.jpg",
      "/images/yala/Yala_National_Park_Sri_Lanka_2012-przerobione-1536x1024.jpg",
      "/images/yala/5673ba75e3a130b16dcb9153758d2994.jpg",
      "/images/yala/091d99424af7627ad847e348945a2ec7.jpg",
    ],
    pickupAreas:
      "Wadduwa, Kalutara, Bentota, Beruwala, Kosgoda, Ahungalla, Hikkaduwa, Galle, Mirissa.",
    includesLabel: "Includes",
    includesText: "Yala entry ticket, safari jeep, private transport.",
    rows: [
      { pax: "1 Pax", vehicle: "Car", price: "$290" },
      { pax: "2 Pax", vehicle: "Car", price: "$340" },
      { pax: "3 Pax", vehicle: "Car", price: "$400" },
      { pax: "4 Pax", vehicle: "Van", price: "$485" },
      { pax: "5 Pax", vehicle: "Van", price: "$545" },
      { pax: "6 Pax", vehicle: "Van", price: "$595" },
    ],
  },
  {
    id: "ella",
    label: "Ella",
    title: "Ella Day Tour",
    images: [
      "/images/ella/ella-slider-1.jpg",
      "/images/ella/Things-to-do-in-Ella.webp",
      "/images/ella/Backpacking-Ella-6.webp",
      "/images/ella/Ella-Sri-Lanka-8-van-11-scaled.jpg",
    ],
    pickupAreas:
      "Wadduwa, Kalutara, Bentota, Beruwala, Kosgoda, Ahungalla, Hikkaduwa, Galle, Mirissa.",
    includesLabel: "Places included",
    includesText:
      "Waterfall visit, Little Adam's Peak hiking, Nine Arch Bridge, train ticket, tuk tuk transfer, private transport.",
    rows: [
      { pax: "1 Pax", vehicle: "Car", price: "$230" },
      { pax: "2 Pax", vehicle: "Car", price: "$270" },
      { pax: "3 Pax", vehicle: "Car", price: "$310" },
      { pax: "4 Pax", vehicle: "Van", price: "$360" },
      { pax: "5 Pax", vehicle: "Van", price: "$400" },
      { pax: "6 Pax", vehicle: "Van", price: "$430" },
    ],
  },
  {
    id: "sigiriya",
    label: "Sigiriya",
    title: "Sigiriya & Dambulla Day Tour",
    images: [
      "/images/sigiriya/Sigiriya-Main.jpg",
      "/images/sigiriya/sigiriya1.jpg",
      "/images/sigiriya/Sigiriya_(141688197).jpeg",
      "/images/sigiriya/Sigiriya-Uncovered-Delving-into-the-History-Art-and-Legends-800x609-1.jpg",
    ],
    pickupAreas: "Wadduwa, Kalutara, Beruwala, Bentota, Ahungalla.",
    includesLabel: "Places included",
    includesText:
      "Sigiriya Rock Fortress, Dambulla Cave Temple, guide service, private transport.",
    rows: [
      { pax: "1 Pax", vehicle: "Car", price: "$296" },
      { pax: "2 Pax", vehicle: "Car", price: "$380" },
      { pax: "3 Pax", vehicle: "Car", price: "$450" },
      { pax: "4 Pax", vehicle: "Van", price: "$520" },
      { pax: "5 Pax", vehicle: "Van", price: "$605" },
    ],
  },
  {
    id: "udawalawe",
    label: "Udawalawe",
    title: "Udawalawe National Park Day Tour",
    images: [
      "/images/udawalawe/777ac20c39b4ec358d3b5e568bcde9b2.jpg",
      "/images/udawalawe/6134a458c9a4ebf4f793c9c82418aaed.jpg",
      "/images/udawalawe/541a1b65dd3e3f4838a6ecda24ec8666.jpg",
      "/images/udawalawe/9cc102b9e719af9e8fd95960880a62a7.jpg",
    ],
    pickupAreas: "Wadduwa, Kalutara, Beruwala, Bentota, Ahungalla.",
    includesLabel: "Includes",
    includesText:
      "Park ticket, safari jeep, elephant milk feeding, private transport.",
    rows: [
      { pax: "1 Pax", vehicle: "Car", price: "$280" },
      { pax: "2 Pax", vehicle: "Car", price: "$320" },
      { pax: "3 Pax", vehicle: "Car", price: "$375" },
      { pax: "4 Pax", vehicle: "Car/Van", price: "$460" },
      { pax: "5 Pax", vehicle: "Van", price: "$495" },
    ],
  },
  {
    id: "galle",
    label: "Galle",
    title: "Galle Day Tour",
    images: [
      "/images/galle/7c928a2ea83c0b7b0be15c895dbfddc5.jpg",
      "/images/galle/426a7c600b8958994d16a273773a43b1.jpg",
      "/images/galle/23f8abdbb4f2450ab9d0ec44ed1170de.jpg",
      "/images/galle/237a7b52854312546872cf2306d50241.jpg",
    ],
    pickupAreas: "Wadduwa, Kalutara, Beruwala, Bentota, Ahungalla.",
    includesLabel: "Places included",
    includesText:
      "Bentota River Tour, Spice Garden, Turtle Conservation Center, Moonstone Mines, Gems & Jewellery, Galle Dutch Fort, Stilt Fishermen, Tea Factory & Plantation.",
    rows: [
      { pax: "1 Pax", vehicle: "Car", price: "$170" },
      { pax: "2 Pax", vehicle: "Car", price: "$200" },
      { pax: "3 Pax", vehicle: "Car", price: "$225" },
      { pax: "4 Pax", vehicle: "Van", price: "$250" },
      { pax: "5 Pax", vehicle: "Van", price: "$265" },
      { pax: "6 Pax", vehicle: "Van", price: "$295" },
    ],
  },
  {
    id: "airport",
    label: "Airport",
    title: "Airport Arrival & Departure Transfers",
    images: [
      "/images/airport/08f03d05a7fc34db514afc88afb6c438.jpg",
      "/images/airport/4b719fa6055755fdbfba08dea58878bc.jpg",
      "/images/airport/d1e2e1674d76426edb152d2bec095382.jpg",
    ],
    transferSections: [
      {
        route:
          "Bandaranaike International Airport to Wadduwa / Kalutara / Beruwala / Bentota",
        rows: [
          { vehicle: "Car", price: "$80" },
          { vehicle: "Van", price: "$90" },
        ],
      },
      {
        route:
          "Bandaranaike International Airport to Ahungalla / Kosgoda / Hikkaduwa",
        rows: [
          { vehicle: "Car", price: "$86" },
          { vehicle: "Van", price: "$100" },
        ],
      },
      {
        route: "Mattala International Airport to Mirissa / Galle",
        rows: [
          { vehicle: "Car", price: "$100" },
          { vehicle: "Van", price: "$130" },
        ],
      },
      {
        route:
          "Mattala International Airport to Hikkaduwa / Ahungalla / Kosgoda",
        rows: [
          { vehicle: "Car", price: "$115" },
          { vehicle: "Van", price: "$125" },
        ],
      },
      {
        route:
          "Mattala International Airport to Bentota / Beruwala / Kalutara / Wadduwa",
        rows: [
          { vehicle: "Car", price: "$125" },
          { vehicle: "Van", price: "$135" },
        ],
      },
    ],
  },
];

export default function PackagesTabs() {
  const [activeTab, setActiveTab] = useState(PACKAGE_TABS[0].id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const currentTab =
    PACKAGE_TABS.find((item) => item.id === activeTab) ?? PACKAGE_TABS[0];
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
            {PACKAGE_TABS.map((item) => {
              const isActive = item.id === currentTab.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
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
                      key={`${currentTab.id}-dot-${index}`}
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
