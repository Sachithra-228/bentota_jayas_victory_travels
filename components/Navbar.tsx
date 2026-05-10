"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import StaggeredMenu from "@/components/StaggeredMenu";
import {
  BRAND_NAME,
  NAV_LINKS,
} from "@/lib/site";

function NavIcon({ href, className = "h-6 w-6" }: { href: string; className?: string }) {
  switch (href) {
    case "/":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" className={className} aria-hidden="true">
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5.5 9.5V21h13V9.5" />
        </svg>
      );
    case "/packages":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2.5" />
        </svg>
      );
    case "/gallery":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" className={className} aria-hidden="true">
          <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
          <circle cx="9" cy="10" r="1.5" />
          <path d="M5.5 17l5-4 3.5 2.5 2.5-2 2 1.5" />
        </svg>
      );
    case "/contact":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" className={className} aria-hidden="true">
          <path d="M4 7.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
          <path d="M4.5 8l7.5 5 7.5-5" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuItems = NAV_LINKS.map((link) => ({
    label: link.label,
    ariaLabel: `Go to ${link.label}`,
    link: link.href,
  }));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 120);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <StaggeredMenu
        className="md:hidden"
        isFixed
        position="right"
        items={mobileMenuItems}
        socialItems={[]}
        displaySocials={false}
        displayItemNumbering={false}
        colors={["#9D7DFF", "#4A2BB8"]}
        logoUrl="/images/benthotalogo.svg"
        menuButtonColor="#111827"
        openMenuButtonColor="#111827"
        changeMenuColorOnOpen
        accentColor="#facc15"
      />

      <div className="hidden md:mx-auto md:block md:w-fit md:py-3">
        <div className={`rounded-[2rem] border border-white/80 bg-white/90 px-3 py-2.5 shadow-soft backdrop-blur-xl transition-all duration-300 md:px-4 ${scrolled ? "md:pointer-events-none md:-translate-y-4 md:opacity-0" : "md:pointer-events-auto md:translate-y-0 md:opacity-100"}`}>
          <div className="hidden md:flex md:items-center md:justify-center md:gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/benthotalogo.svg"
                alt={BRAND_NAME}
                width={170}
                height={52}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>

            <nav>
              <div className="flex items-center gap-1">
                {NAV_LINKS.map((link) => {
                  const active =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative px-2.5 py-2 text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:h-0.5 after:rounded-full after:bg-yellow-400 ${
                        active
                          ? "text-slate-900 after:scale-x-100"
                          : "text-slate-700 hover:text-yellow-500 after:scale-x-0"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      </div>

      <nav className={`pointer-events-none fixed right-4 top-1/2 hidden -translate-y-1/2 transition-all duration-300 md:block ${scrolled ? "opacity-100" : "translate-x-6 opacity-0"}`} aria-label="Quick navigation">
        <div className="group/rail pointer-events-auto flex flex-col items-center gap-2 rounded-[1.75rem] border border-white/50 bg-white/20 p-2 shadow-soft backdrop-blur-2xl">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={`float-${link.href}`}
                href={link.href}
                title={link.label}
                aria-label={link.label}
                className={`group/item inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border px-2.5 transition-all duration-300 group-hover/rail:w-36 group-hover/rail:justify-start ${active ? "border-yellow-400/80 bg-yellow-200/20 text-yellow-500" : "border-transparent bg-white/10 text-slate-700 hover:border-yellow-300/70 hover:bg-yellow-100/40 hover:text-yellow-500"}`}
              >
                <NavIcon href={link.href} />
                <span className="ml-2 max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover/rail:max-w-[90px] group-hover/rail:opacity-100">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
