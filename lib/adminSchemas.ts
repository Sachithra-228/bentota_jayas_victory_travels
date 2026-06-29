import { z } from "zod";
import { GALLERY_SECTIONS } from "@/models/GalleryImage";

const tourRowSchema = z.object({
  pax: z.string().min(1, "Pax is required."),
  vehicle: z.string().min(1, "Vehicle is required."),
  price: z.string().min(1, "Price is required."),
});

const transferRowSchema = z.object({
  vehicle: z.string().min(1, "Vehicle is required."),
  price: z.string().min(1, "Price is required."),
});

const transferSectionSchema = z.object({
  route: z.string().min(1, "Route is required."),
  rows: z.array(transferRowSchema).default([]),
});

export const packageSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase letters, numbers and dashes."
    ),
  label: z.string().min(1, "Label is required."),
  title: z.string().min(1, "Title is required."),
  images: z.array(z.string().min(1)).default([]),
  pickupAreas: z.string().optional().default(""),
  includesLabel: z.string().optional().default(""),
  includesText: z.string().optional().default(""),
  rows: z.array(tourRowSchema).default([]),
  transferSections: z.array(transferSectionSchema).default([]),
  note: z.string().optional().default(""),
  warning: z.string().optional().default(""),
  order: z.coerce.number().int().default(0),
});

export const galleryImageSchema = z.object({
  section: z.enum(GALLERY_SECTIONS as [string, ...string[]]),
  src: z.string().min(1, "Image source is required."),
  alt: z.string().optional().default(""),
  order: z.coerce.number().int().default(0),
});

export type PackageInput = z.infer<typeof packageSchema>;
export type GalleryImageInput = z.infer<typeof galleryImageSchema>;
