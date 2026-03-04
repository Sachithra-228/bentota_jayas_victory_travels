import { CONTACT_EMAIL } from "@/lib/site";

export const metadata = {
  title: "Admin Access | Bentota Jaya's Victory Travels",
  description: "Private admin access information page.",
};

export default function AdminLoginPage() {
  return (
    <div className="bg-slate-50">
      <section className="container py-12">
        <div className="mx-auto max-w-2xl rounded-[2rem] bg-white p-8 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
            Private area
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Admin access is restricted
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            This page is reserved for internal team use. If you need help with
            tour content updates or booking requests, contact the team instead
            of using the public site.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-6 inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
          >
            Contact support
          </a>
        </div>
      </section>
    </div>
  );
}
