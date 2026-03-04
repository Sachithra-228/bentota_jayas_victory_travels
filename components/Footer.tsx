import Image from "next/image";
import Link from "next/link";
import {
  BRAND_NAME,
  CONTACT_EMAIL,
  PHONE_DIGITS,
  PHONE_DISPLAY,
  buildWhatsAppLink,
} from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="container grid gap-8 py-10 text-sm md:grid-cols-4">
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt={BRAND_NAME}
              width={56}
              height={56}
              className="h-12 w-12 rounded-2xl object-cover"
            />
            <div>
              <div className="font-semibold text-white">{BRAND_NAME}</div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-slate-400">
                Sri Lanka travel specialists
              </div>
            </div>
          </div>

          <p className="max-w-xl text-slate-400">
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
          <div className="mb-2 font-semibold text-white">Contact</div>
          <p className="text-slate-400">
            Bentota, Southern Province
            <br />
            Sri Lanka
          </p>
          <p className="mt-2 text-slate-400">
            Phone:{" "}
            <a href={`tel:${PHONE_DIGITS}`} className="font-semibold text-white">
              {PHONE_DISPLAY}
            </a>
            <br />
            Email:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-white"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
          <a
            href={buildWhatsAppLink(
              "Hello, I would like a custom Sri Lanka itinerary."
            )}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center rounded-full bg-brand-teal px-4 py-2 text-xs font-semibold text-white hover:bg-brand-lightTeal"
          >
            WhatsApp planning
          </a>
        </div>

        <div>
          <div className="mb-2 font-semibold text-white">Quick links</div>
          <div className="flex flex-col gap-1 text-slate-400">
            <Link href="/tours">Sri Lanka Tours</Link>
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/admin/login">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
