"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Suggestion from "@/components/Suggestion";
import { usePathname } from "next/navigation";
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="m-auto max-w-[1300px]">
      <Navbar />
      <div className="md:flex">
        <Sidebar />
        {children}
        {pathname === "/explore" || pathname === "/home" ? (
          <Suggestion />
        ) : null}
      </div>
    </div>
  );
}
