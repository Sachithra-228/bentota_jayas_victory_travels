"use client";

import CircularGallery from "@/components/CircularGallery";

const galleryOne = [
  { image: "/images/d1.jpg", text: "" },
  { image: "/images/d2.jpg", text: "" },
  { image: "/images/d3.jpg", text: "" },
  { image: "/images/d4.jpg", text: "" },
  { image: "/images/d5.jpg", text: "" },
  { image: "/images/d6.jpg", text: "" },
  { image: "/images/d7.jpg", text: "" },
  { image: "/images/d8.jpg", text: "" },
];

export default function CircularGalleriesSection() {
  return (
    <section className="py-8 md:py-10">
      <div className="relative h-[560px] w-full overflow-hidden md:h-[680px]">
        <CircularGallery
          items={galleryOne}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.5}
          scrollSpeed={2}
          scrollEase={0.03}
        />
      </div>
    </section>
  );
}
