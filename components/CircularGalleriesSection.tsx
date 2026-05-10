"use client";

import CircularGallery from "@/components/CircularGallery";

const galleryOne = [
  { image: "/images/gallery_1.png", text: "" },
  { image: "/images/gallery_2.png", text: "" },
  { image: "/images/gallery_3.png", text: "" },
  { image: "/images/gallery_4.png", text: "" },
  { image: "/images/gallery_5.png", text: "" },
  { image: "/images/gallery_6.png", text: "" },
  { image: "/images/gallery_7.png", text: "" },
  { image: "/images/gallery_8.png", text: "" },
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
