import { Schema, model, models, type Document } from "mongoose";

export type TourRow = {
  pax: string;
  vehicle: string;
  price: string;
};

export type TransferRow = {
  vehicle: string;
  price: string;
};

export type TransferSection = {
  route: string;
  rows: TransferRow[];
};

export interface PackageDocument extends Document {
  slug: string;
  label: string;
  title: string;
  images: string[];
  pickupAreas?: string;
  includesLabel?: string;
  includesText?: string;
  rows: TourRow[];
  transferSections: TransferSection[];
  note?: string;
  warning?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TourRowSchema = new Schema<TourRow>(
  {
    pax: { type: String, required: true },
    vehicle: { type: String, required: true },
    price: { type: String, required: true },
  },
  { _id: false }
);

const TransferRowSchema = new Schema<TransferRow>(
  {
    vehicle: { type: String, required: true },
    price: { type: String, required: true },
  },
  { _id: false }
);

const TransferSectionSchema = new Schema<TransferSection>(
  {
    route: { type: String, required: true },
    rows: [TransferRowSchema],
  },
  { _id: false }
);

const PackageSchema = new Schema<PackageDocument>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    label: { type: String, required: true },
    title: { type: String, required: true },
    images: [{ type: String }],
    pickupAreas: { type: String },
    includesLabel: { type: String },
    includesText: { type: String },
    rows: [TourRowSchema],
    transferSections: [TransferSectionSchema],
    note: { type: String },
    warning: { type: String },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

PackageSchema.index({ order: 1 });

export const Package =
  models.Package || model<PackageDocument>("Package", PackageSchema);
