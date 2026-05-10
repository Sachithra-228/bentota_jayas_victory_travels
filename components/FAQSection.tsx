"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import AnimatedList from "./AnimatedList";

type FaqItem = {
  question: string;
  sectionLabel: string;
  placesTitle: string;
  places: string[];
  pricesTitle: string;
  prices: string[];
};

const TOUR_FAQS: FaqItem[] = [
  {
    question: "What is included in the Kandy Day Tour?",
    sectionLabel: "Kandy Day Tour",
    placesTitle: "Places Included",
    places: [
      "Pinnawala Elephant Orphanage",
      "Spice Garden & Tea Plantation",
      "Peradeniya Botanical Garden",
      "Kandy Temple",
    ],
    pricesTitle: "Price Range",
    prices: ["Rs. 92,000", "Rs. 118,000", "Rs. 152,000"],
  },
  {
    question: "What does the Yala National Park Day Tour include?",
    sectionLabel: "Yala National Park Day Tour",
    placesTitle: "Included",
    places: ["Yala Entry Ticket", "Safari Jeep", "Taxi Transportation"],
    pricesTitle: "Price Range",
    prices: [
      "Rs. 82,000",
      "Rs. 96,000",
      "Rs. 115,000",
      "Rs. 135,000",
      "Rs. 153,000",
      "Rs. 168,000",
    ],
  },
  {
    question: "What can I experience on the Ella Day Tour?",
    sectionLabel: "Ella Day Tour",
    placesTitle: "Places Included",
    places: [
      "Waterfalls",
      "Adam's Peak Hiking",
      "Train Ride",
      "9 Arch Bridge",
      "Tuk Tuk Experience",
    ],
    pricesTitle: "Price Range",
    prices: ["Rs. 64,000", "Rs. 76,000", "Rs. 102,000", "Rs. 109,000", "Rs. 128,000"],
  },
  {
    question: "What is included in the Sigiriya & Dambulla Day Tour?",
    sectionLabel: "Sigiriya & Dambulla Day Tour",
    placesTitle: "Places Included",
    places: [
      "Sigiriya Rock Fortress",
      "Dambulla Cave Temple",
      "Tour Guides",
      "Taxi Transportation",
    ],
    pricesTitle: "Price Range",
    prices: [
      "Rs. 79,000",
      "Rs. 99,000",
      "Rs. 119,000",
      "Rs. 150,000",
      "Rs. 177,000",
    ],
  },
  {
    question: "What does the Udawalawe National Park Day Tour include?",
    sectionLabel: "Udawalawe National Park Day Tour",
    placesTitle: "Included",
    places: [
      "National Park Ticket",
      "Safari Jeep",
      "Elephant Milk Feeding",
      "Taxi Transportation",
    ],
    pricesTitle: "Price Range",
    prices: [
      "Rs. 79,800",
      "Rs. 91,600",
      "Rs. 107,400",
      "Rs. 134,500",
      "Rs. 148,000",
    ],
  },
  {
    question: "Which highlights are covered in the Galle Day Tour?",
    sectionLabel: "Galle Day Tour",
    placesTitle: "Places Included",
    places: [
      "Bentota River Safari",
      "Turtle Conservation Center",
      "Moonstone Mines",
      "Gems & Jewellery",
      "Galle Dutch Fort",
      "Stick Fishermen",
    ],
    pricesTitle: "Price Range",
    prices: [
      "Rs. 46,000",
      "Rs. 54,500",
      "Rs. 63,000",
      "Rs. 76,500",
      "Rs. 88,500",
      "Rs. 147,500",
    ],
  },
  {
    question: "How much are airport arrival and departure transfers?",
    sectionLabel: "Airport Arrival & Departure Transfers",
    placesTitle: "Routes Included",
    places: [
      "Bandaranaike International Airport -> Bentota / Beruwala / Kalutara / Wadduwa",
      "Airport -> Ahungalla / Kosgoda / Hikkaduwa",
    ],
    pricesTitle: "Vehicle Prices",
    prices: ["Car - Rs. 22,000", "Van - Rs. 28,000"],
  },
];

export default function FAQSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedFaq = TOUR_FAQS[selectedIndex] ?? TOUR_FAQS[0];
  const questionItems = useMemo(
    () => TOUR_FAQS.map((item) => item.question),
    [],
  );

  return (
    <section className="relative overflow-hidden bg-slate-950 pb-14 pt-20 text-white md:pb-16 md:pt-24">
      <div className="absolute left-0 right-0 top-0 h-14 -translate-y-[98%] text-slate-950 md:h-20">
        <svg
          className="h-full w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,68 C220,10 430,118 680,78 C920,40 1030,95 1200,58 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.15),_transparent_48%)]" />
      <div className="container relative z-10">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-300">
            FAQ + Tour Packages
          </p>
          <h2 className="mt-2 max-w-4xl text-3xl font-semibold leading-tight md:text-4xl">
            Select a question to reveal full tour inclusions and latest package prices
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <AnimatedList
            items={questionItems}
            onItemSelect={(_, index) => setSelectedIndex(index)}
            showGradients
            enableArrowNavigation
            displayScrollbar
            initialSelectedIndex={0}
          />

          <AnimatePresence mode="wait">
            <motion.article
              key={selectedFaq.question}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-[460px] overflow-y-auto space-y-7 border-l border-cyan-300/30 pl-5 pr-2 md:pl-8"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-teal-200">
                  {selectedFaq.sectionLabel}
                </p>
                <h3 className="mt-2 text-2xl font-semibold md:text-3xl">
                  {selectedFaq.question}
                </h3>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">
                  {selectedFaq.placesTitle}
                </h4>
                <ul className="space-y-3 text-sm leading-6 text-slate-200 md:text-base">
                  {selectedFaq.places.map((place) => (
                    <li key={place} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      <span>{place}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">
                  {selectedFaq.pricesTitle}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedFaq.prices.map((price) => (
                    <span
                      key={price}
                      className="rounded-full border border-cyan-200/45 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100"
                    >
                      {price}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
