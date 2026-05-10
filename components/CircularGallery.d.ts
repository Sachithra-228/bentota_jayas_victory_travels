declare module "@/components/CircularGallery" {
  import * as React from "react";

  type GalleryItem = { image: string; text: string };

  type CircularGalleryProps = {
    items?: GalleryItem[];
    bend?: number;
    textColor?: string;
    borderRadius?: number;
    font?: string;
    scrollSpeed?: number;
    scrollEase?: number;
  };

  const CircularGallery: React.ComponentType<CircularGalleryProps>;
  export default CircularGallery;
}
