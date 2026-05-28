import Image from "next/image";
import Link from "next/link";
import {
  BRAND_NAME,
  CONTACT_EMAIL,
  PHONE_DIGITS,
  PHONE_DISPLAY,
} from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-700">
      <div className="container grid gap-8 py-10 text-sm md:grid-cols-4">
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src="/images/newlogo.png"
              alt={BRAND_NAME}
              width={190}
              height={52}
              className="h-11 w-auto object-contain"
            />
            <div>
              <div className="font-semibold text-slate-900">{BRAND_NAME}</div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                Sri Lanka travel specialists
              </div>
            </div>
          </div>

          <p className="max-w-xl text-slate-600">
            Private tours across Bentota, Ella, Sigiriya, Kandy, Yala, and the
            southern coast, designed by a local Sri Lankan team with direct
            support before and during the trip.
          </p>

          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights
            reserved.
          </p>
        </div>

        <div>
          <div className="mb-2 font-semibold text-slate-900">Contact</div>
          <p className="text-slate-600">
            Bentota, Southern Province
            <br />
            Sri Lanka
          </p>
          <p className="mt-2 text-slate-600">
            Phone:{" "}
            <a href={`tel:${PHONE_DIGITS}`} className="font-semibold text-slate-900">
              {PHONE_DISPLAY}
            </a>
            <br />
            Email:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-slate-900"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        <div>
          <div className="mb-2 font-semibold text-slate-900">Quick links</div>
          <div className="flex flex-col gap-1 text-slate-600">
            <Link href="/packages">Packages</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/gallery">Gallery</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
