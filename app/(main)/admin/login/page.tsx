"use client"

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-light px-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-border-light bg-white shadow-xl grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="relative hidden h-full bg-linear-to-br from-primary/90 to-secondary/80 p-10 text-white lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_30%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">Admin Console</p>
              <h1 className="mt-3 text-3xl font-bold">Internal Access</h1>
              <p className="mt-2 text-sm text-white/80">Authorized users only. Activity is monitored.</p>
            </div>
            <div className="space-y-3 text-sm">
              <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                <p className="font-semibold">Security reminder</p>
                <p className="text-white/80">Use company SSO or strong password. Do not share credentials.</p>
              </div>
              <p className="text-white/70">Need help? Contact IT support.</p>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Sign in</p>
            <h2 className="text-2xl font-bold text-text-dark">Admin login</h2>
            <p className="text-sm text-text-medium">Enter your work email and password.</p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-dark">Work email</label>
              <input
                type="email"
                placeholder="admin@company.com"
                className="w-full rounded-xl border border-border-light bg-bg-light/60 px-4 py-3 text-sm text-text-dark placeholder:text-text-medium focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-dark">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-border-light bg-bg-light/60 px-4 py-3 text-sm text-text-dark placeholder:text-text-medium focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-text-medium">
                <input type="checkbox" className="checkbox-input" />
                Remember me
              </label>
              <button type="button" className="font-semibold text-primary hover:text-secondary" onClick={() => console.log('Forgot password')}>
                Forgot password?
              </button>
            </div>
            <button
              type="button"
              onClick={() => console.log('Admin sign-in (stub)')}
              className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-secondary"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 rounded-xl bg-bg-soft px-4 py-3 text-xs text-text-medium">
            This is a mock login for design only. Hook to your auth backend/SSO later.
          </div>
        </div>
      </div>
    </main>
  )
}
