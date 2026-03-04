import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

export function hasDatabaseConfig() {
  return Boolean(process.env.MONGODB_URI);
}

export async function connectToDatabase() {
  const mongodbUri = process.env.MONGODB_URI;

  if (!mongodbUri) {
    throw new Error(
      "Missing MONGODB_URI. Please set it in your Vercel environment variables or .env.local."
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongodbUri).then((m) => m);
  }

  cached.conn = await cached.promise;
  global.mongooseCache = cached;
  return cached.conn;
}

