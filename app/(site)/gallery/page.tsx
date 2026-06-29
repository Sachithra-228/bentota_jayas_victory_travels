import DomeGallery from "@/components/DomeGallery";
import WildlifeGallery from "@/components/WildlifeGallery";
import { getGallery } from "@/lib/content";

export const metadata = {
  title: "Gallery | Bentota Jaya's Victory Travels",
  description:
    "Interactive dome gallery and wildlife photography from Bentota Jaya's Victory Travels.",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const gallery = await getGallery();
  const domeImages = gallery.dome.map((item) => ({
    src: item.src,
    alt: item.alt,
  }));
  const birds = gallery["wildlife-birds"].map((item) => ({
    src: item.src,
    alt: item.alt,
  }));
  const animals = gallery["wildlife-animals"].map((item) => ({
    src: item.src,
    alt: item.alt,
  }));

  return (
    <div className="-mt-32 bg-[#120F17] md:-mt-36">
      {/* Dome gallery — full viewport height */}
      <div className="h-screen pt-32 md:pt-36">
        <DomeGallery
          images={domeImages}
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

      {/* Wildlife scroll gallery */}
      <WildlifeGallery birds={birds} animals={animals} />
    </div>
  );
}
