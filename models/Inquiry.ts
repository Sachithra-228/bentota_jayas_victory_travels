import { Schema, model, models, type Document } from "mongoose";

export type InquiryStatus = "new" | "read";

export interface InquiryDocument extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  tourSlug?: string;
  status: InquiryStatus;
  createdAt: Date;
}

const InquirySchema = new Schema<InquiryDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    tourSlug: { type: String },
    status: {
      type: String,
      enum: ["new", "read"],
      default: "new",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

InquirySchema.index({ status: 1, createdAt: -1 });

export const Inquiry =
  models.Inquiry || model<InquiryDocument>("Inquiry", InquirySchema);

