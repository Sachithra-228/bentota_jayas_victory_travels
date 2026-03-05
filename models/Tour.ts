import { Schema, model, models, type Document } from "mongoose";

export type ItineraryItem = {
  day: number;
  title: string;
  description: string;
};

export interface TourDocument extends Document {
  title: string;
  slug: string;
  description?: string;
  destination: string;
  category: string;
  durationDays: number;
  priceFrom: number;
  currency: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryItem[];
  images: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ItinerarySchema = new Schema<ItineraryItem>(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const TourSchema = new Schema<TourDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    destination: { type: String, required: true },
    category: { type: String, required: true },
    durationDays: { type: Number, required: true },
    priceFrom: { type: Number, required: true },
    currency: { type: String, required: true, default: "USD" },
    highlights: [{ type: String }],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    itinerary: [ItinerarySchema],
    images: [{ type: String }],
    isPublished: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Tour = models.Tour || model<TourDocument>("Tour", TourSchema);

