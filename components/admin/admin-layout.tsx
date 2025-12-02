"use client"

import { useState } from 'react'
import AdminSidebar from './admin-sidebar'
import AdminTopbar from './admin-topbar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-bg-light">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[280px,1fr]">
        <div className={`border-border-light bg-white transition-all lg:block ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
          <AdminSidebar />
        </div>
        <div className="flex flex-col">
          <AdminTopbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
