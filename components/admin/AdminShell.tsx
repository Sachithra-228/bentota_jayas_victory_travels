"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function PackagesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
  );
}

function GalleryIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

const NAV = [
  { href: "/admin", label: "Packages", Icon: PackagesIcon, exact: true },
  { href: "/admin/gallery", label: "Gallery", Icon: GalleryIcon, exact: false },
];

export default function AdminShell({
  username,
  children,
}: {
  username: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="border-b border-slate-200 px-6 py-5">
          <p className="text-sm font-semibold text-slate-900">Admin Panel</p>
          <p className="mt-0.5 text-xs text-slate-500">
            Bentota Jaya&apos;s Victory Travels
          </p>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive(item.href, item.exact)
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <item.Icon />
              {item.label}
            </Link>
          ))}

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            <ExternalIcon />
            View site
          </Link>
        </nav>

        <div className="border-t border-slate-200 px-3 py-4">
          <div className="px-3 pb-3">
            <p className="text-xs text-slate-400">Signed in as</p>
            <p className="truncate text-sm font-medium text-slate-700">
              {username}
            </p>
          </div>
          <form action="/api/admin/auth/logout" method="post">
            <button
              type="submit"
              className="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Log out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex w-full flex-col md:w-auto md:flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-900">Admin</span>
            <nav className="flex items-center gap-3 text-sm">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-medium ${
                    isActive(item.href, item.exact)
                      ? "text-slate-900"
                      : "text-slate-500"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <form action="/api/admin/auth/logout" method="post">
            <button
              type="submit"
              className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white"
            >
              Log out
            </button>
          </form>
        </header>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
