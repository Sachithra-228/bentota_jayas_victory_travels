import { getSession } from "@/lib/session";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin | Bentota Jaya's Victory Travels",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // The login page lives under /admin but has no session; render it bare.
  if (!session) {
    return <>{children}</>;
  }

  return <AdminShell username={session.username}>{children}</AdminShell>;
}
