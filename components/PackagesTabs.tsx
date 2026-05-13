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
  image: string;
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
    image: "/images/kandytour.png",
    pickupAreas:
      "Bentota, Ahungalla, Kosgoda, Beruwala, Kalutara, Wadduwa, Colombo, Katunayake, Negombo.",
    rows: [
      { pax: "1 Pax", vehicle: "Car", price: "Rs. 77,000" },
      { pax: "2 Pax", vehicle: "Car", price: "Rs. 92,000" },
      { pax: "3 Pax", vehicle: "Car", price: "Rs. 118,000" },
      { pax: "4 Pax", vehicle: "Van", price: "Rs. 152,000" },
    ],
    note: "Children and baby prices may vary.",
  },
  {
    id: "yala",
    label: "Yala",
    title: "Yala National Park Day Tour",
    image: "/images/yalatour.png",
    pickupAreas:
      "Wadduwa, Kalutara, Bentota, Beruwala, Kosgoda, Ahungalla, Hikkaduwa, Galle, Mirissa.",
    includesLabel: "Includes",
    includesText: "Yala entry ticket, safari jeep, private transport.",
    rows: [
      { pax: "1 Pax", vehicle: "Car", price: "Rs. 82,000" },
      { pax: "2 Pax", vehicle: "Car", price: "Rs. 96,000" },
      { pax: "3 Pax", vehicle: "Car", price: "Rs. 115,000" },
      { pax: "4 Pax", vehicle: "Van", price: "Rs. 135,000" },
      { pax: "5 Pax", vehicle: "Van", price: "Rs. 153,000" },
      { pax: "6 Pax", vehicle: "Van", price: "Rs. 168,000" },
    ],
  },
  {
    id: "ella",
    label: "Ella",
    title: "Ella Day Tour",
    image: "/images/ellatour.png",
    pickupAreas:
      "Wadduwa, Kalutara, Bentota, Beruwala, Kosgoda, Ahungalla, Hikkaduwa, Galle, Mirissa.",
    includesLabel: "Places included",
    includesText:
      "Waterfall visit, Little Adam's Peak hiking, Nine Arch Bridge, train ticket, tuk tuk transfer, private transport.",
    rows: [
      { pax: "1 Pax", vehicle: "Car", price: "Rs. 64,000" },
      { pax: "2 Pax", vehicle: "Car", price: "Rs. 76,000" },
      { pax: "3 Pax", vehicle: "Car", price: "Rs. 86,000" },
      { pax: "4 Pax", vehicle: "Van", price: "Rs. 102,000" },
      { pax: "5 Pax", vehicle: "Van", price: "Rs. 109,000" },
      { pax: "6 Pax", vehicle: "Van", price: "Rs. 128,000" },
    ],
  },
  {
    id: "sigiriya",
    label: "Sigiriya",
    title: "Sigiriya & Dambulla Day Tour",
    image: "/images/sigiriyatour.png",
    pickupAreas: "Wadduwa, Kalutara, Beruwala, Bentota, Ahungalla.",
    includesLabel: "Places included",
    includesText:
      "Sigiriya Rock Fortress, Dambulla Cave Temple, guide service, private transport.",
    rows: [
      { pax: "1 Pax", vehicle: "Car", price: "Rs. 79,000" },
      { pax: "2 Pax", vehicle: "Car", price: "Rs. 99,000" },
      { pax: "3 Pax", vehicle: "Car", price: "Rs. 119,000" },
      { pax: "4 Pax", vehicle: "Van", price: "Rs. 150,000" },
      { pax: "5 Pax", vehicle: "Van", price: "Rs. 177,000" },
    ],
  },
  {
    id: "udawalawe",
    label: "Udawalawe",
    title: "Udawalawe National Park Day Tour",
    image: "/images/udawalawatour.png",
    pickupAreas: "Wadduwa, Kalutara, Beruwala, Bentota, Ahungalla.",
    includesLabel: "Includes",
    includesText:
      "Park ticket, safari jeep, elephant milk feeding, private transport.",
    rows: [
      { pax: "1 Pax", vehicle: "Car", price: "Rs. 79,800" },
      { pax: "2 Pax", vehicle: "Car", price: "Rs. 91,600" },
      { pax: "3 Pax", vehicle: "Car", price: "Rs. 107,400" },
      { pax: "4 Pax", vehicle: "Car/Van", price: "Rs. 134,500" },
      { pax: "5 Pax", vehicle: "Van", price: "Rs. 148,000" },
    ],
  },
  {
    id: "galle",
    label: "Galle",
    title: "Galle Day Tour",
    image: "/images/galledaytour.png",
    pickupAreas: "Wadduwa, Kalutara, Beruwala, Bentota, Ahungalla.",
    includesLabel: "Places included",
    includesText:
      "Bentota River Tour, Spice Garden, Turtle Conservation Center, Moonstone Mines, Gems & Jewellery, Galle Dutch Fort, Stilt Fishermen, Tea Factory & Plantation.",
    rows: [
      { pax: "1 Pax", vehicle: "Car", price: "Rs. 46,000" },
      { pax: "2 Pax", vehicle: "Car", price: "Rs. 54,500" },
      { pax: "3 Pax", vehicle: "Car", price: "Rs. 63,000" },
      { pax: "4 Pax", vehicle: "Van", price: "Rs. 76,500" },
      { pax: "5 Pax", vehicle: "Van", price: "Rs. 80,000" },
      { pax: "6 Pax", vehicle: "Van", price: "Rs. 88,500" },
    ],
  },
  {
    id: "airport",
    label: "Airport",
    title: "Airport Arrival & Departure Transfers",
    image: "/images/airportnew.png",
    transferSections: [
      {
        route:
          "Bandaranaike International Airport to Wadduwa / Kalutara / Beruwala / Bentota",
        rows: [
          { vehicle: "Car", price: "Rs. 22,000" },
          { vehicle: "Van", price: "Rs. 28,000" },
        ],
      },
      {
        route:
          "Bandaranaike International Airport to Ahungalla / Kosgoda / Hikkaduwa",
        rows: [
          { vehicle: "Car", price: "Rs. 26,000" },
          { vehicle: "Van", price: "Rs. 30,000" },
        ],
      },
      {
        route: "Mattala International Airport to Mirissa / Galle",
        rows: [
          { vehicle: "Car", price: "Rs. 32,000" },
          { vehicle: "Van", price: "Rs. 35,000" },
        ],
      },
      {
        route:
          "Mattala International Airport to Hikkaduwa / Ahungalla / Kosgoda",
        rows: [
          { vehicle: "Car", price: "Rs. 35,000" },
          { vehicle: "Van", price: "Rs. 40,000" },
        ],
      },
      {
        route:
          "Mattala International Airport to Bentota / Beruwala / Kalutara / Wadduwa",
        rows: [
          { vehicle: "Car", price: "Rs. 40,000" },
          { vehicle: "Van", price: "Rs. 45,000" },
        ],
      },
    ],
  },
];

export default function PackagesTabs() {
  const [activeTab, setActiveTab] = useState(PACKAGE_TABS[0].id);
  const currentTab =
    PACKAGE_TABS.find((item) => item.id === activeTab) ?? PACKAGE_TABS[0];

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
                  onClick={() => setActiveTab(item.id)}
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

        <article className="mt-6 overflow-hidden rounded-[2rem] border border-cyan-200/20 bg-cyan-950/30 shadow-[0_20px_60px_rgba(5,24,36,0.35)]">
          <div className="grid lg:grid-cols-[0.9fr,1.1fr]">
            <div className="relative min-h-[22rem] bg-slate-900 md:min-h-[28rem] lg:min-h-[44rem]">
              <Image
                src={currentTab.image}
                alt={currentTab.title}
                width={900}
                height={700}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-5 md:p-6">
              <h2 className="text-2xl font-semibold text-cyan-50 md:text-3xl">
                {currentTab.title}
              </h2>

              {currentTab.pickupAreas && (
                <p className="mt-4 text-sm leading-7 text-cyan-100/85">
                  <span className="font-semibold text-cyan-100">Pickup areas: </span>
                  {currentTab.pickupAreas}
                </p>
              )}

              {currentTab.includesText && (
                <p className="mt-3 text-sm leading-7 text-cyan-100/85">
                  <span className="font-semibold text-cyan-100">
                    {currentTab.includesLabel}:{" "}
                  </span>
                  {currentTab.includesText}
                </p>
              )}

              {currentTab.rows && (
                <div className="mt-6 overflow-hidden rounded-2xl border border-cyan-200/20">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead className="bg-cyan-200/10">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-cyan-100">Pax</th>
                        <th className="px-4 py-3 font-semibold text-cyan-100">Vehicle</th>
                        <th className="px-4 py-3 text-right font-semibold text-cyan-100">
                          Selling Price
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
                <div className="mt-6 space-y-5">
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
                              Price
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
        </article>
      </div>
    </section>
  );
}
