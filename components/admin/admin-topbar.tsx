import { Bell, Menu, Search, User } from "lucide-react";

type AdminTopbarProps = {
  onToggleSidebar?: () => void;
};

export default function AdminTopbar({ onToggleSidebar }: AdminTopbarProps) {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-border-light bg-white px-4 py-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-light bg-bg-soft text-text-dark transition hover:border-primary hover:text-primary"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-medium" />
          <input
            type="text"
            placeholder="Search users, policies, claims..."
            className="w-72 rounded-xl border border-border-light bg-bg-light/70 px-10 py-2 text-sm text-text-dark placeholder:text-text-medium focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-light bg-white text-text-dark transition hover:border-primary hover:text-primary"
          onClick={() => console.log("Notifications (stub)")}
        >
          <Bell className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-border-light bg-white px-3 py-2 text-sm font-semibold text-text-dark transition hover:border-primary hover:text-primary"
          onClick={() => console.log("Profile (stub)")}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
            A
          </div>
          <span className="hidden sm:inline">Admin</span>
          <User className="h-4 w-4 text-text-medium" />
        </button>
      </div>
    </header>
  );
}
