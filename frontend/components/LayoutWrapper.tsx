"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return <main className="bg-gray-100 min-h-screen">{children}</main>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 pl-73 p-2 bg-gray-50 min-h-screen">{children}</main>
    </div>
  );
}