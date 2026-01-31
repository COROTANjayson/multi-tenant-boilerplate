import { cookies } from "next/headers";
import { Navbar } from "@/components/navbar";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAuthenticated = !!cookieStore.get("accessToken")?.value;

  return (
    <>
      <Navbar initialIsAuthenticated={isAuthenticated} />
      {children}
    </>
  );
}
