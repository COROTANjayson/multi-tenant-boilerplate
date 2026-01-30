import { cookies } from "next/headers";
import { AuthGuard } from "@/components/auth-guard";
import { Sidebar } from "@/components/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAuthenticated = !!cookieStore.get("accessToken")?.value;

  return (
    <AuthGuard initialIsAuthenticated={isAuthenticated}>
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-1">{children}</main>
      </div>
    </AuthGuard>
  );
}
