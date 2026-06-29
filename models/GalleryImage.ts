import { Schema, model, models, type Document } from "mongoose";

export type GallerySection = "dome" | "wildlife-birds" | "wildlife-animals";

export const GALLERY_SECTIONS: GallerySection[] = [
  "dome",
  "wildlife-birds",
  "wildlife-animals",
];

export interface GalleryImageDocument extends Document {
  section: GallerySection;
  src: string;
  alt: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema = new Schema<GalleryImageDocument>(
  {
    section: {
      type: String,
      required: true,
      enum: GALLERY_SECTIONS,
    },
    src: { type: String, required: true },
    alt: { type: String, required: true, default: "" },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

GalleryImageSchema.index({ section: 1, order: 1 });

export const GalleryImage =
  models.GalleryImage ||
  model<GalleryImageDocument>("GalleryImage", GalleryImageSchema);
