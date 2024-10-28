import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SetionProvider from "./SetionProvider";
import Navbar from "./Navbar";
import StoreProvider from "./StoreProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();
  if (!session.user) redirect("/login");
  return (
    <StoreProvider>
      <SetionProvider value={session}>
        <Navbar />
        {children}
      </SetionProvider>
    </StoreProvider>
  );
}
