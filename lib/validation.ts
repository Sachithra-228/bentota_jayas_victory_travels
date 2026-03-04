import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().min(6, "Please enter a contact number."),
  message: z.string().min(10, "Please share a few trip details."),
  tourSlug: z.string().optional().nullable(),
});

export const contactInquirySchema = inquirySchema.extend({
  tourSlug: z.string().optional().nullable(),
});

export const tourUpsertSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  destination: z.string().min(2),
  category: z.string().min(2),
  durationDays: z.coerce.number().int().positive(),
  priceFrom: z.coerce.number().positive(),
  currency: z.string().default("LKR"),
  highlights: z
    .string()
    .transform((val) =>
      val
        .split("\n")
        .map((v) => v.trim())
        .filter(Boolean)
    )
    .optional(),
  inclusions: z
    .string()
    .transform((val) =>
      val
        .split("\n")
        .map((v) => v.trim())
        .filter(Boolean)
    )
    .optional(),
  exclusions: z
    .string()
    .transform((val) =>
      val
        .split("\n")
        .map((v) => v.trim())
        .filter(Boolean)
    )
    .optional(),
  images: z
    .string()
    .transform((val) =>
      val
        .split("\n")
        .map((v) => v.trim())
        .filter(Boolean)
    )
    .optional(),
  itinerary: z
    .string()
    .transform((val) =>
      val
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line, idx) => ({
          day: idx + 1,
          title: line,
          description: line,
        }))
    )
    .optional(),
  isPublished: z.coerce.boolean().optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
export type TourUpsertInput = z.infer<typeof tourUpsertSchema>;

