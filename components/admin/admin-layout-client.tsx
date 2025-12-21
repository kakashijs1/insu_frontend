"use client";

import { useState, Activity } from "react";
import AdminSidebar from "./admin-sidebar";
import AdminTopbar from "./admin-topbar";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-light">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[280px,1fr]">
        <Activity mode={sidebarOpen ? "visible" : "hidden"}>
          <div className="border-border-light bg-white transition-all">
            <AdminSidebar />
          </div>
        </Activity>
        <div className="flex flex-col">
          <AdminTopbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
