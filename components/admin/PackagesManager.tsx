"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploadButton from "./ImageUploadButton";

type Row = { pax: string; vehicle: string; price: string };
type TransferRow = { vehicle: string; price: string };
type TransferSection = { route: string; rows: TransferRow[] };

export type AdminPackage = {
  id: string;
  slug: string;
  label: string;
  title: string;
  images: string[];
  pickupAreas: string;
  includesLabel: string;
  includesText: string;
  rows: Row[];
  transferSections: TransferSection[];
  note: string;
  warning: string;
  order: number;
};

const EMPTY_DRAFT: AdminPackage = {
  id: "",
  slug: "",
  label: "",
  title: "",
  images: [],
  pickupAreas: "",
  includesLabel: "Includes",
  includesText: "",
  rows: [],
  transferSections: [],
  note: "",
  warning: "",
  order: 0,
};

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20";

export default function PackagesManager({
  initial,
}: {
  initial: AdminPackage[];
}) {
  const router = useRouter();
  const [packages, setPackages] = useState<AdminPackage[]>(initial);
  const [draft, setDraft] = useState<AdminPackage | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);

  function startEdit(pkg: AdminPackage) {
    setDraft(JSON.parse(JSON.stringify(pkg)));
    setIsNew(false);
    setMessage(null);
    setError(null);
  }

  function startNew() {
    setDraft({ ...EMPTY_DRAFT, order: packages.length });
    setIsNew(true);
    setMessage(null);
    setError(null);
  }

  function update<K extends keyof AdminPackage>(key: K, value: AdminPackage[K]) {
    setDraft((d) => (d ? { ...d, [key]: value } : d));
  }

  async function seed() {
    setSeeding(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Import failed.");
        return;
      }
      router.refresh();
    } catch {
      setError("Import failed.");
    } finally {
      setSeeding(false);
    }
  }

  async function save() {
    if (!draft) return;
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const url = isNew
        ? "/api/admin/packages"
        : `/api/admin/packages/${draft.id}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Save failed.");
        return;
      }
      const saved: AdminPackage = data.package;
      setPackages((prev) =>
        isNew
          ? [...prev, saved]
          : prev.map((p) => (p.id === saved.id ? saved : p))
      );
      setDraft(null);
      setIsNew(false);
      setMessage("Saved.");
      router.refresh();
    } catch {
      setError("Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(pkg: AdminPackage) {
    if (!confirm(`Delete "${pkg.label}"? This cannot be undone.`)) return;
    setError(null);
    try {
      const res = await fetch(`/api/admin/packages/${pkg.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Delete failed.");
        return;
      }
      setPackages((prev) => prev.filter((p) => p.id !== pkg.id));
      if (draft?.id === pkg.id) setDraft(null);
      router.refresh();
    } catch {
      setError("Delete failed.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Packages</h1>
        <button
          onClick={startNew}
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          + Add package
        </button>
      </div>

      {message && (
        <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
          {message}
        </p>
      )}
      {error && (
        <p className="mt-4 rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-700">
          {error}
        </p>
      )}

      {packages.length === 0 && !draft && (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-sm text-slate-600">
            No packages in the database yet. Import the content currently shown
            on the website to get started.
          </p>
          <button
            onClick={seed}
            disabled={seeding}
            className="mt-4 rounded-full bg-brand-teal px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
          >
            {seeding ? "Importing…" : "Import current website content"}
          </button>
        </div>
      )}

      {/* List */}
      {!draft && packages.length > 0 && (
        <div className="mt-6 grid gap-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3"
            >
              <div className="flex items-center gap-3">
                {pkg.images[0] && (
                  <div className="relative h-12 w-16 overflow-hidden rounded-md bg-slate-100">
                    <Image
                      src={pkg.images[0]}
                      alt={pkg.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-medium text-slate-900">{pkg.label}</p>
                  <p className="text-xs text-slate-500">{pkg.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(pkg)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(pkg)}
                  className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor */}
      {draft && (
        <PackageEditor
          draft={draft}
          isNew={isNew}
          inputClass={inputClass}
          saving={saving}
          onChange={update}
          onCancel={() => setDraft(null)}
          onSave={save}
        />
      )}
    </div>
  );
}

function PackageEditor({
  draft,
  isNew,
  inputClass,
  saving,
  onChange,
  onCancel,
  onSave,
}: {
  draft: AdminPackage;
  isNew: boolean;
  inputClass: string;
  saving: boolean;
  onChange: <K extends keyof AdminPackage>(key: K, value: AdminPackage[K]) => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  function moveImage(index: number, dir: number) {
    const next = [...draft.images];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange("images", next);
  }

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          {isNew ? "New package" : `Editing: ${draft.label}`}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Tab label
          <input
            className={inputClass}
            value={draft.label}
            onChange={(e) => onChange("label", e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Slug (URL id, lowercase-dashes)
          <input
            className={inputClass}
            value={draft.slug}
            onChange={(e) => onChange("slug", e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-slate-700 md:col-span-2">
          Title (heading)
          <input
            className={inputClass}
            value={draft.title}
            onChange={(e) => onChange("title", e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-slate-700 md:col-span-2">
          Pickup areas
          <textarea
            className={inputClass}
            rows={2}
            value={draft.pickupAreas}
            onChange={(e) => onChange("pickupAreas", e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Includes label
          <input
            className={inputClass}
            value={draft.includesLabel}
            onChange={(e) => onChange("includesLabel", e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Display order
          <input
            type="number"
            className={inputClass}
            value={draft.order}
            onChange={(e) => onChange("order", Number(e.target.value))}
          />
        </label>
        <label className="block text-sm font-medium text-slate-700 md:col-span-2">
          Includes text
          <textarea
            className={inputClass}
            rows={2}
            value={draft.includesText}
            onChange={(e) => onChange("includesText", e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Note (amber banner, optional)
          <input
            className={inputClass}
            value={draft.note}
            onChange={(e) => onChange("note", e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Warning (red banner, optional)
          <input
            className={inputClass}
            value={draft.warning}
            onChange={(e) => onChange("warning", e.target.value)}
          />
        </label>
      </div>

      {/* Images */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">Images</h3>
          <ImageUploadButton
            label="+ Add image"
            onUploaded={(url) => onChange("images", [...draft.images, url])}
          />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {draft.images.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="overflow-hidden rounded-lg border border-slate-200"
            >
              <div className="relative h-24 w-full bg-slate-100">
                <Image src={src} alt="" fill className="object-cover" />
              </div>
              <div className="flex items-center justify-between gap-1 p-1.5">
                <div className="flex gap-1">
                  <button
                    onClick={() => moveImage(i, -1)}
                    className="rounded border border-slate-200 px-1.5 text-xs text-slate-600 hover:bg-slate-50"
                    aria-label="Move left"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => moveImage(i, 1)}
                    className="rounded border border-slate-200 px-1.5 text-xs text-slate-600 hover:bg-slate-50"
                    aria-label="Move right"
                  >
                    →
                  </button>
                </div>
                <button
                  onClick={() =>
                    onChange(
                      "images",
                      draft.images.filter((_, idx) => idx !== i)
                    )
                  }
                  className="rounded px-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {draft.images.length === 0 && (
            <p className="col-span-full text-xs text-slate-500">
              No images yet. Use “Add image” to upload.
            </p>
          )}
        </div>
      </div>

      {/* Price rows */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">
            Price rows (Person / Vehicle / Price)
          </h3>
          <button
            onClick={() =>
              onChange("rows", [
                ...draft.rows,
                { pax: "", vehicle: "", price: "" },
              ])
            }
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            + Add row
          </button>
        </div>
        <div className="mt-3 space-y-2">
          {draft.rows.map((row, i) => (
            <div key={i} className="flex gap-2">
              <input
                className={`${inputClass} mt-0`}
                placeholder="1 Person"
                value={row.pax}
                onChange={(e) => {
                  const rows = [...draft.rows];
                  rows[i] = { ...rows[i], pax: e.target.value };
                  onChange("rows", rows);
                }}
              />
              <input
                className={`${inputClass} mt-0`}
                placeholder="Car"
                value={row.vehicle}
                onChange={(e) => {
                  const rows = [...draft.rows];
                  rows[i] = { ...rows[i], vehicle: e.target.value };
                  onChange("rows", rows);
                }}
              />
              <input
                className={`${inputClass} mt-0`}
                placeholder="$150"
                value={row.price}
                onChange={(e) => {
                  const rows = [...draft.rows];
                  rows[i] = { ...rows[i], price: e.target.value };
                  onChange("rows", rows);
                }}
              />
              <button
                onClick={() =>
                  onChange(
                    "rows",
                    draft.rows.filter((_, idx) => idx !== i)
                  )
                }
                className="shrink-0 rounded-lg px-3 text-xs font-semibold text-rose-600 hover:bg-rose-50"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Transfer sections */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">
            Transfer sections (for airport-style tabs)
          </h3>
          <button
            onClick={() =>
              onChange("transferSections", [
                ...draft.transferSections,
                { route: "", rows: [] },
              ])
            }
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            + Add section
          </button>
        </div>
        <div className="mt-3 space-y-4">
          {draft.transferSections.map((section, si) => (
            <div
              key={si}
              className="rounded-xl border border-slate-200 bg-slate-50 p-3"
            >
              <div className="flex gap-2">
                <input
                  className={`${inputClass} mt-0`}
                  placeholder="Airport to Bentota"
                  value={section.route}
                  onChange={(e) => {
                    const sections = [...draft.transferSections];
                    sections[si] = { ...sections[si], route: e.target.value };
                    onChange("transferSections", sections);
                  }}
                />
                <button
                  onClick={() =>
                    onChange(
                      "transferSections",
                      draft.transferSections.filter((_, idx) => idx !== si)
                    )
                  }
                  className="shrink-0 rounded-lg px-3 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                >
                  Remove section
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {section.rows.map((row, ri) => (
                  <div key={ri} className="flex gap-2">
                    <input
                      className={`${inputClass} mt-0`}
                      placeholder="Car"
                      value={row.vehicle}
                      onChange={(e) => {
                        const sections = [...draft.transferSections];
                        const rows = [...sections[si].rows];
                        rows[ri] = { ...rows[ri], vehicle: e.target.value };
                        sections[si] = { ...sections[si], rows };
                        onChange("transferSections", sections);
                      }}
                    />
                    <input
                      className={`${inputClass} mt-0`}
                      placeholder="$80"
                      value={row.price}
                      onChange={(e) => {
                        const sections = [...draft.transferSections];
                        const rows = [...sections[si].rows];
                        rows[ri] = { ...rows[ri], price: e.target.value };
                        sections[si] = { ...sections[si], rows };
                        onChange("transferSections", sections);
                      }}
                    />
                    <button
                      onClick={() => {
                        const sections = [...draft.transferSections];
                        sections[si] = {
                          ...sections[si],
                          rows: sections[si].rows.filter((_, idx) => idx !== ri),
                        };
                        onChange("transferSections", sections);
                      }}
                      className="shrink-0 rounded-lg px-3 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const sections = [...draft.transferSections];
                    sections[si] = {
                      ...sections[si],
                      rows: [...sections[si].rows, { vehicle: "", price: "" }],
                    };
                    onChange("transferSections", sections);
                  }}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  + Add vehicle row
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
