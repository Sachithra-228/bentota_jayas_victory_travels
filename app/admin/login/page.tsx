import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Admin Login | Bentota Jaya's Victory Travels",
  description: "Private admin access.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: { from?: string };
}) {
  const session = await getSession();
  if (session) {
    redirect(searchParams.from || "/admin");
  }

  return (
    <div className="bg-slate-50">
      <section className="container py-16">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-teal">
            Private area
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Admin login
          </h1>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Sign in to manage packages and gallery content.
          </p>
          <LoginForm redirectTo={searchParams.from || "/admin"} />
        </div>
      </section>
    </div>
  );
}
