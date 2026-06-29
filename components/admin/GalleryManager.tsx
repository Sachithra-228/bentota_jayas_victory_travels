"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploadButton from "./ImageUploadButton";

export type AdminGalleryImage = {
  id: string;
  section: string;
  src: string;
  alt: string;
  order: number;
};

const SECTIONS: { key: string; label: string; hint: string }[] = [
  { key: "dome", label: "Dome gallery", hint: "Rotating 3D dome on the gallery page." },
  { key: "wildlife-birds", label: "Birds of Sri Lanka", hint: "Birds carousel." },
  { key: "wildlife-animals", label: "Wild animals", hint: "Animals carousel." },
];

export default function GalleryManager({
  initial,
}: {
  initial: AdminGalleryImage[];
}) {
  const router = useRouter();
  const [images, setImages] = useState<AdminGalleryImage[]>(initial);
  const [error, setError] = useState<string | null>(null);

  async function addImage(section: string, url: string) {
    setError(null);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, src: url, alt: "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Could not add image.");
        return;
      }
      setImages((prev) => [...prev, data.image]);
      router.refresh();
    } catch {
      setError("Could not add image.");
    }
  }

  async function updateImage(id: string, patch: Partial<AdminGalleryImage>) {
    setError(null);
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Update failed.");
        return;
      }
      setImages((prev) => prev.map((img) => (img.id === id ? data.image : img)));
      router.refresh();
    } catch {
      setError("Update failed.");
    }
  }

  async function deleteImage(id: string) {
    if (!confirm("Delete this image?")) return;
    setError(null);
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Delete failed.");
        return;
      }
      setImages((prev) => prev.filter((img) => img.id !== id));
      router.refresh();
    } catch {
      setError("Delete failed.");
    }
  }

  async function move(section: string, id: string, dir: number) {
    const sectionImages = images
      .filter((i) => i.section === section)
      .sort((a, b) => a.order - b.order);
    const index = sectionImages.findIndex((i) => i.id === id);
    const target = index + dir;
    if (target < 0 || target >= sectionImages.length) return;

    const a = sectionImages[index];
    const b = sectionImages[target];
    // Swap order values and persist both.
    await Promise.all([
      updateImage(a.id, { order: b.order }),
      updateImage(b.id, { order: a.order }),
    ]);
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Gallery</h1>
      {error && (
        <p className="mt-4 rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-700">
          {error}
        </p>
      )}

      {SECTIONS.map((section) => {
        const sectionImages = images
          .filter((i) => i.section === section.key)
          .sort((a, b) => a.order - b.order);

        return (
          <section key={section.key} className="mt-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {section.label}
                </h2>
                <p className="text-xs text-slate-500">{section.hint}</p>
              </div>
              <ImageUploadButton
                label="+ Add image"
                onUploaded={(url) => addImage(section.key, url)}
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {sectionImages.map((img, i) => (
                <div
                  key={img.id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                >
                  <div className="relative h-28 w-full bg-slate-100">
                    <Image src={img.src} alt={img.alt} fill className="object-cover" />
                  </div>
                  <div className="space-y-2 p-2">
                    <input
                      className="w-full rounded-md border border-slate-300 px-2 py-1 text-xs text-slate-900"
                      placeholder="Alt text"
                      defaultValue={img.alt}
                      onBlur={(e) => {
                        if (e.target.value !== img.alt) {
                          updateImage(img.id, { alt: e.target.value });
                        }
                      }}
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        <button
                          onClick={() => move(section.key, img.id, -1)}
                          disabled={i === 0}
                          className="rounded border border-slate-200 px-1.5 text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                          aria-label="Move up"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => move(section.key, img.id, 1)}
                          disabled={i === sectionImages.length - 1}
                          className="rounded border border-slate-200 px-1.5 text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                          aria-label="Move down"
                        >
                          →
                        </button>
                      </div>
                      <button
                        onClick={() => deleteImage(img.id)}
                        className="rounded px-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {sectionImages.length === 0 && (
                <p className="col-span-full text-xs text-slate-500">
                  No images in this section yet.
                </p>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
