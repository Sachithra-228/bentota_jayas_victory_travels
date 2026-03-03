import { connectToDatabase } from "./db";
import { Tour, type TourDocument } from "@/models/Tour";
import { seedTours } from "./seedData";
import { toLkrAmount } from "./pricing";

export type TourFilters = {
  category?: string;
  destination?: string;
  minPrice?: number;
  maxPrice?: number;
  minDuration?: number;
  maxDuration?: number;
};

declare global {
  // eslint-disable-next-line no-var
  var toursSeeded: boolean | undefined;
}

const globalForSeed = global as typeof globalThis & {
  toursSeeded?: boolean;
};

export async function ensureSeedTours() {
  if (globalForSeed.toursSeeded) return;

  await connectToDatabase();

  try {
    await Tour.insertMany(seedTours, { ordered: false });
  } catch (error) {
    const err = error as any;
    // Ignore duplicate key errors if seed data was already inserted
    if (err?.name !== "MongoBulkWriteError" || err?.code !== 11000) {
      throw error;
    }
  }

  globalForSeed.toursSeeded = true;
}

export async function getFeaturedTours() {
  await ensureSeedTours();
  const tours = await Tour.find({ isPublished: true })
    .sort({ createdAt: -1 })
    .limit(6)
    .lean<TourDocument[]>();
  return tours.map(serializeTour);
}

export async function getTours(
  filters: TourFilters = {},
  sort: string | undefined = undefined
) {
  await ensureSeedTours();
  const query: Record<string, unknown> = { isPublished: true };

  if (filters.category) {
    query.category = filters.category;
  }
  if (filters.destination) {
    query.destination = new RegExp(filters.destination, "i");
  }
  if (
    filters.minDuration !== undefined ||
    filters.maxDuration !== undefined
  ) {
    query.durationDays = {};
    if (filters.minDuration !== undefined) {
      (query.durationDays as any).$gte = filters.minDuration;
    }
    if (filters.maxDuration !== undefined) {
      (query.durationDays as any).$lte = filters.maxDuration;
    }
  }
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    query.priceFrom = {};
    if (filters.minPrice !== undefined) {
      (query.priceFrom as any).$gte = filters.minPrice;
    }
    if (filters.maxPrice !== undefined) {
      (query.priceFrom as any).$lte = filters.maxPrice;
    }
  }

  let sortSpec: Record<string, 1 | -1> = { createdAt: -1 };
  if (sort === "price-asc") sortSpec = { priceFrom: 1 };
  if (sort === "price-desc") sortSpec = { priceFrom: -1 };
  if (sort === "duration-asc") sortSpec = { durationDays: 1 };
  if (sort === "duration-desc") sortSpec = { durationDays: -1 };

  const tours = await Tour.find(query).sort(sortSpec).lean<TourDocument[]>();
  return tours.map(serializeTour);
}

export async function getTourBySlug(slug: string) {
  await ensureSeedTours();
  const tour = await Tour.findOne({ slug, isPublished: true }).lean<TourDocument | null>();
  return tour ? serializeTour(tour) : null;
}

export type SerializedTour = ReturnType<typeof serializeTour>;

function serializeTour(tour: TourDocument) {
  return {
    ...tour,
    priceFrom: toLkrAmount(tour.priceFrom, tour.currency),
    currency: "LKR",
    _id: tour._id.toString(),
    createdAt: tour.createdAt?.toISOString?.() ?? null,
    updatedAt: tour.updatedAt?.toISOString?.() ?? null,
  };
}

