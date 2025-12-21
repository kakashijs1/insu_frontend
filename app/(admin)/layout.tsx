import AdminLayoutClient from "@/components/admin/admin-layout-client";
import AdminDashboard from '@/components/admin/admin-dashboard'

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminLayoutClient>
      <AdminDashboard />
    </AdminLayoutClient>
  );
}
