import DomeGallery from "@/components/DomeGallery";

export const metadata = {
  title: "Gallery | Bentota Jaya's Victory Travels",
  description:
    "Interactive dome gallery view of Bentota Jaya's Victory Travels.",
};

export default function GalleryPage() {
  const images = [
    { src: "/images/d1.jpg", alt: "Bentota dome image 1" },
    { src: "/images/d2.jpg", alt: "Bentota dome image 2" },
    { src: "/images/d3.jpg", alt: "Bentota dome image 3" },
    { src: "/images/d4.jpg", alt: "Bentota dome image 4" },
    { src: "/images/d5.jpg", alt: "Bentota dome image 5" },
    { src: "/images/d6.jpg", alt: "Bentota dome image 6" },
    { src: "/images/d7.jpg", alt: "Bentota dome image 7" },
    { src: "/images/d8.jpg", alt: "Bentota dome image 8" },
  ];

  return (
    <div className="-mt-32 h-screen bg-[#120F17] md:-mt-36">
      <div className="h-full pt-32 md:pt-36">
        <DomeGallery
          images={images}
          fit={0.5}
          fitBasis="auto"
          minRadius={600}
          padFactor={0.2}
          overlayBlurColor="#120F17"
          maxVerticalRotationDeg={5}
          dragSensitivity={20}
          enlargeTransitionMs={300}
          segments={35}
          dragDampening={2}
          openedImageWidth="400px"
          openedImageHeight="400px"
          imageBorderRadius="30px"
          openedImageBorderRadius="30px"
          grayscale={false}
        />
      </div>
    </div>
  );
}
