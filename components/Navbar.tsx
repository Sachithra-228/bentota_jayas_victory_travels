"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BRAND_NAME,
  NAV_LINKS,
  PHONE_DIGITS,
  PHONE_DISPLAY,
  buildWhatsAppLink,
} from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container py-4">
        <div className="rounded-[2rem] border border-white/80 bg-white/90 px-4 py-3 shadow-soft backdrop-blur-xl">
          <div className="flex items-center justify-between md:hidden">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt={BRAND_NAME}
                width={56}
                height={56}
                className="h-12 w-12 rounded-2xl object-cover"
                priority
              />
              <div>
                <div className="text-sm font-semibold tracking-wide text-slate-900">
                  {BRAND_NAME}
                </div>
                <div className="text-[11px] text-slate-500">
                  Curated Sri Lanka journeys
                </div>
              </div>
            </Link>

            <button
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700"
              onClick={() => setOpen((value) => !value)}
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1">
                <span className="block h-0.5 w-5 bg-slate-800" />
                <span className="block h-0.5 w-5 bg-slate-800" />
                <span className="block h-0.5 w-5 bg-slate-800" />
              </div>
            </button>
          </div>

          <div className="hidden md:grid md:grid-cols-[auto,1fr,auto] md:items-center md:gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt={BRAND_NAME}
                width={64}
                height={64}
                className="h-14 w-14 rounded-[1.4rem] object-cover"
                priority
              />
              <div>
                <div className="text-sm font-semibold tracking-wide text-slate-900">
                  {BRAND_NAME}
                </div>
                <div className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                  Sri Lanka local experts
                </div>
              </div>
            </Link>

            <nav className="justify-self-center">
              <div className="flex items-center gap-1 rounded-full bg-slate-900 p-1.5 shadow-lg">
                {NAV_LINKS.map((link) => {
                  const active =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        active
                          ? "bg-white text-slate-900"
                          : "text-white/75 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${PHONE_DIGITS}`}
                className="text-right text-xs text-slate-500"
              >
                <span className="block text-[10px] uppercase tracking-[0.2em]">
                  Call us
                </span>
                <span className="font-semibold text-slate-900">
                  {PHONE_DISPLAY}
                </span>
              </a>
              <a
                href={buildWhatsAppLink(
                  "Hello, I would like to plan a Sri Lanka trip."
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-brand-teal px-5 py-3 text-xs font-semibold text-white shadow-soft hover:bg-brand-lightTeal"
              >
                Plan on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {open && (
          <nav className="mt-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft md:hidden">
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-2xl px-4 py-3 text-sm ${
                      active
                        ? "bg-brand-teal text-white"
                        : "bg-slate-50 text-slate-700"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <a
                href={`tel:${PHONE_DIGITS}`}
                className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700"
              >
                Call us: <span className="font-semibold">{PHONE_DISPLAY}</span>
              </a>
              <a
                href={buildWhatsAppLink(
                  "Hello, I would like to plan a Sri Lanka trip."
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-brand-teal px-4 py-3 text-sm font-semibold text-white"
              >
                WhatsApp us
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
