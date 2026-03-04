export const BRAND_NAME = "Bentota Jaya's Victory Travels";
export const PHONE_DISPLAY = "+94 77 777 8271";
export const PHONE_DIGITS = PHONE_DISPLAY.replace(/[^0-9]/g, "");
export const CONTACT_EMAIL = "info@bentotajayastravels.com";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const GALLERY_IMAGES = [
  {
    title: "Bentota beach mornings",
    location: "Bentota",
    caption: "Calm shoreline stays, river safaris, and private beach time.",
    url: "/images/bentota.jpg",
  },
  {
    title: "Hill country rail views",
    location: "Ella",
    caption: "Tea-country scenery, cool air, and the iconic train route.",
    url: "/images/ella.jpg",
  },
  {
    title: "Ancient rock fortress routes",
    location: "Sigiriya",
    caption: "Culture-rich journeys with heritage stops and local guides.",
    url: "/images/sigiriya.jpg",
  },
  {
    title: "Wildlife days in the south",
    location: "Yala",
    caption: "Safari mornings with trusted drivers and handpicked timings.",
    url: "/images/wildlife.jpg",
  },
  {
    title: "Romantic coast sunsets",
    location: "Galle Coast",
    caption: "Boutique stays and couples-friendly itineraries by the sea.",
    url: "/images/honeymoon.jpg",
  },
  {
    title: "Tea estate escapes",
    location: "Nuwara Eliya",
    caption: "Slow scenic days across tea trails and misty viewpoints.",
    url: "/images/culture.jpg",
  },
];

const TOUR_CATEGORY_IMAGES: Record<string, string> = {
  beach: "/images/beach.jpg",
  culture: "/images/culture.jpg",
  family: "/images/family.jpg",
  honeymoon: "/images/honeymoon.jpg",
  wildlife: "/images/wildlife.jpg",
};

export function buildWhatsAppLink(message?: string) {
  if (!message) {
    return `https://wa.me/${PHONE_DIGITS}`;
  }

  return `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(message)}`;
}

export function getTourImage(category?: string) {
  if (!category) {
    return "/images/beach.jpg";
  }

  return TOUR_CATEGORY_IMAGES[category] || "/images/beach.jpg";
}
