export function serializePackage(doc: any) {
  return {
    id: String(doc._id),
    slug: doc.slug,
    label: doc.label,
    title: doc.title,
    images: doc.images ?? [],
    pickupAreas: doc.pickupAreas ?? "",
    includesLabel: doc.includesLabel ?? "",
    includesText: doc.includesText ?? "",
    rows: (doc.rows ?? []).map((r: any) => ({
      pax: r.pax,
      vehicle: r.vehicle,
      price: r.price,
    })),
    transferSections: (doc.transferSections ?? []).map((s: any) => ({
      route: s.route,
      rows: (s.rows ?? []).map((r: any) => ({
        vehicle: r.vehicle,
        price: r.price,
      })),
    })),
    note: doc.note ?? "",
    warning: doc.warning ?? "",
    order: doc.order ?? 0,
  };
}

export function serializeGalleryImage(doc: any) {
  return {
    id: String(doc._id),
    section: doc.section,
    src: doc.src,
    alt: doc.alt ?? "",
    order: doc.order ?? 0,
  };
}

export type SerializedPackage = ReturnType<typeof serializePackage>;
export type SerializedGalleryImage = ReturnType<typeof serializeGalleryImage>;
