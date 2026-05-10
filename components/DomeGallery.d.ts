declare module "@/components/DomeGallery" {
  import * as React from "react";

  type DomeImage = string | { src: string; alt?: string };

  type DomeGalleryProps = {
    images?: DomeImage[];
    fit?: number;
    fitBasis?: "auto" | "min" | "max" | "width" | "height";
    minRadius?: number;
    maxRadius?: number;
    padFactor?: number;
    overlayBlurColor?: string;
    maxVerticalRotationDeg?: number;
    dragSensitivity?: number;
    enlargeTransitionMs?: number;
    segments?: number;
    dragDampening?: number;
    openedImageWidth?: string;
    openedImageHeight?: string;
    imageBorderRadius?: string;
    openedImageBorderRadius?: string;
    grayscale?: boolean;
  };

  const DomeGallery: React.ComponentType<DomeGalleryProps>;
  export default DomeGallery;
}
