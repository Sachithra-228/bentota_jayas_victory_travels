import { Schema, model, models, type Document } from "mongoose";

export interface AdminUserDocument extends Document {
  username: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema = new Schema<AdminUserDocument>(
  {
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const AdminUser =
  models.AdminUser || model<AdminUserDocument>("AdminUser", AdminUserSchema);
