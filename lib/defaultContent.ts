import type { GallerySection } from "@/models/GalleryImage";

export type TourRow = {
  pax: string;
  vehicle: string;
  price: string;
};

export type TransferRow = {
  vehicle: string;
  price: string;
};

export type TransferSection = {
  route: string;
  rows: TransferRow[];
};

export type PackageTab = {
  slug: string;
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

export type GalleryItem = {
  section: GallerySection;
  src: string;
  alt: string;
};

export const DEFAULT_PACKAGES: PackageTab[] = [
  {
    slug: "kandy",
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
    includesLabel: "Includes",
    includesText:
      "Pinnawala Elephant Orphanage entry ticket, Botanical Garden ticket, Kandy Temple ticket, and guide.",
    rows: [
      { pax: "1 Person", vehicle: "Car", price: "$270" },
      { pax: "2 Person", vehicle: "Car", price: "$333" },
      { pax: "3 Person", vehicle: "Car", price: "$410" },
      { pax: "4 Person", vehicle: "Van", price: "$525" },
    ],
    note: "Children and baby prices may vary.",
  },
  {
    slug: "yala",
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
      { pax: "1 Person", vehicle: "Car", price: "$290" },
      { pax: "2 Person", vehicle: "Car", price: "$340" },
      { pax: "3 Person", vehicle: "Car", price: "$400" },
      { pax: "4 Person", vehicle: "Van", price: "$485" },
      { pax: "5 Person", vehicle: "Van", price: "$545" },
      { pax: "6 Person", vehicle: "Van", price: "$595" },
    ],
  },
  {
    slug: "ella",
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
      { pax: "1 Person", vehicle: "Car", price: "$230" },
      { pax: "2 Person", vehicle: "Car", price: "$270" },
      { pax: "3 Person", vehicle: "Car", price: "$310" },
      { pax: "4 Person", vehicle: "Van", price: "$360" },
      { pax: "5 Person", vehicle: "Van", price: "$400" },
      { pax: "6 Person", vehicle: "Van", price: "$430" },
    ],
  },
  {
    slug: "sigiriya",
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
      { pax: "1 Person", vehicle: "Car", price: "$296" },
      { pax: "2 Person", vehicle: "Car", price: "$380" },
      { pax: "3 Person", vehicle: "Car", price: "$450" },
      { pax: "4 Person", vehicle: "Van", price: "$520" },
      { pax: "5 Person", vehicle: "Van", price: "$605" },
    ],
  },
  {
    slug: "udawalawe",
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
      { pax: "1 Person", vehicle: "Car", price: "$280" },
      { pax: "2 Person", vehicle: "Car", price: "$320" },
      { pax: "3 Person", vehicle: "Car", price: "$375" },
      { pax: "4 Person", vehicle: "Car/Van", price: "$460" },
      { pax: "5 Person", vehicle: "Van", price: "$495" },
    ],
  },
  {
    slug: "galle",
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
      { pax: "1 Person", vehicle: "Car", price: "$170" },
      { pax: "2 Person", vehicle: "Car", price: "$200" },
      { pax: "3 Person", vehicle: "Car", price: "$225" },
      { pax: "4 Person", vehicle: "Van", price: "$250" },
      { pax: "5 Person", vehicle: "Van", price: "$265" },
      { pax: "6 Person", vehicle: "Van", price: "$295" },
    ],
  },
  {
    slug: "mirissa",
    label: "Mirissa Whale Watching",
    title: "Whale Watching Mirissa Day Tour",
    images: [
      "/images/mirissa/whale-1.jpg",
      "/images/mirissa/whale-2.jpg",
      "/images/mirissa/whale-3.jpg",
      "/images/mirissa/whale-4.jpg",
    ],
    pickupAreas:
      "Wadduwa, Kalutara, Beruwala, Bentota, Ahungalla, Hikkaduwa, Galle.",
    includesLabel: "Includes",
    includesText: "Taxi, ticket, breakfast, vessel, crew service.",
    rows: [
      { pax: "1 Person", vehicle: "Car", price: "$150" },
      { pax: "2 Person", vehicle: "Car", price: "$190" },
      { pax: "3 Person", vehicle: "Car", price: "$250" },
      { pax: "4 Person", vehicle: "Van", price: "$300" },
      { pax: "5 Person", vehicle: "Van", price: "$365" },
      { pax: "6 Person", vehicle: "Van", price: "$420" },
    ],
  },
  {
    slug: "airport",
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

export const DEFAULT_GALLERY: GalleryItem[] = [
  ...Array.from({ length: 8 }, (_, i) => ({
    section: "dome" as GallerySection,
    src: `/images/d${i + 1}.jpg`,
    alt: `Bentota dome image ${i + 1}`,
  })),
  ...Array.from({ length: 11 }, (_, i) => ({
    section: "wildlife-birds" as GallerySection,
    src: `/images/gallery/p${i + 1}.jpeg`,
    alt: `Sri Lanka bird ${i + 1}`,
  })),
  ...Array.from({ length: 6 }, (_, i) => ({
    section: "wildlife-animals" as GallerySection,
    src: `/images/gallery/a${i + 1}.jpeg`,
    alt: `Sri Lanka animal ${i + 1}`,
  })),
];
