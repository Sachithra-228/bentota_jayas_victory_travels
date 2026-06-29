// Creates or updates an admin user.
// Usage:  node scripts/create-admin.mjs <username> <password>
//
// Reads MONGODB_URI from .env.local (or the environment).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnvLocal() {
  try {
    const file = readFileSync(join(__dirname, "..", ".env.local"), "utf8");
    for (const line of file.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // .env.local is optional; env vars may be provided directly.
  }
}

async function main() {
  const [, , username, password] = process.argv;
  if (!username || !password) {
    console.error("Usage: node scripts/create-admin.mjs <username> <password>");
    process.exit(1);
  }

  loadEnvLocal();
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Missing MONGODB_URI (set it in .env.local).");
    process.exit(1);
  }

  await mongoose.connect(uri);

  const AdminUser =
    mongoose.models.AdminUser ||
    mongoose.model(
      "AdminUser",
      new mongoose.Schema(
        {
          username: { type: String, required: true, unique: true, lowercase: true, trim: true },
          passwordHash: { type: String, required: true },
        },
        { timestamps: true }
      )
    );

  const normalized = username.trim().toLowerCase();
  const passwordHash = await bcrypt.hash(password, 10);

  const result = await AdminUser.findOneAndUpdate(
    { username: normalized },
    { username: normalized, passwordHash },
    { upsert: true, new: true }
  );

  console.log(`Admin user ready: ${result.username}`);
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
