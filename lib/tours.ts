import { unstable_noStore as noStore } from "next/cache";
import { connectToDatabase, hasDatabaseConfig } from "./db";
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

type SeedTourRecord = (typeof seedTours)[number] & {
  _id: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export async function ensureSeedTours() {
  if (!hasDatabaseConfig()) {
    return;
  }

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
  noStore();

  if (!hasDatabaseConfig()) {
    return getSeedTours().slice(0, 6).map(serializeTour);
  }

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
  noStore();

  if (!hasDatabaseConfig()) {
    return getSeedTours(filters, sort).map(serializeTour);
  }

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
  noStore();

  if (!hasDatabaseConfig()) {
    const tour = getSeedTours().find((item) => item.slug === slug) ?? null;
    return tour ? serializeTour(tour) : null;
  }

  await ensureSeedTours();
  const tour = await Tour.findOne({ slug, isPublished: true }).lean<TourDocument | null>();
  return tour ? serializeTour(tour) : null;
}

export type SerializedTour = ReturnType<typeof serializeTour>;

function getSeedTours(
  filters: TourFilters = {},
  sort: string | undefined = undefined
): SeedTourRecord[] {
  const filtered = seedTours
    .filter((tour) => tour.isPublished)
    .filter((tour) => {
      if (filters.category && tour.category !== filters.category) {
        return false;
      }
      if (
        filters.destination &&
        !tour.destination.toLowerCase().includes(filters.destination.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.minDuration !== undefined &&
        tour.durationDays < filters.minDuration
      ) {
        return false;
      }
      if (
        filters.maxDuration !== undefined &&
        tour.durationDays > filters.maxDuration
      ) {
        return false;
      }
      if (filters.minPrice !== undefined && tour.priceFrom < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== undefined && tour.priceFrom > filters.maxPrice) {
        return false;
      }

      return true;
    })
    .map((tour, index) => ({
      ...tour,
      _id: `seed-${index + 1}`,
      createdAt: null,
      updatedAt: null,
    }));

  const sorters: Record<string, (a: SeedTourRecord, b: SeedTourRecord) => number> = {
    "price-asc": (a, b) => a.priceFrom - b.priceFrom,
    "price-desc": (a, b) => b.priceFrom - a.priceFrom,
    "duration-asc": (a, b) => a.durationDays - b.durationDays,
    "duration-desc": (a, b) => b.durationDays - a.durationDays,
  };

  if (sort && sorters[sort]) {
    filtered.sort(sorters[sort]);
  }

  return filtered;
}

function serializeTour(tour: TourDocument | SeedTourRecord) {
  return {
    ...tour,
    priceFrom: toLkrAmount(tour.priceFrom, tour.currency),
    currency: "LKR",
    _id: String(tour._id),
    createdAt: toIsoString(tour.createdAt),
    updatedAt: toIsoString(tour.updatedAt),
  };
}

function toIsoString(value?: Date | null) {
  return value?.toISOString?.() ?? null;
}

